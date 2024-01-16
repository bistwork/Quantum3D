import { useConfigurator } from "../contexts/Configurator"
import { OrbitControls,Environment,useGLTF } from "@react-three/drei";
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import React, { useMemo,useState,useEffect } from 'react';

const SCALE = 3.28084;
const THRASH = [100000,100000,100000];

const Glass = (props) => {

  const cageMaterialFront = new THREE.MeshBasicMaterial( { color: 0x7396ae, side: THREE.BackSide,transparent:true,opacity:0.6} );
  const cageMaterialBack = new THREE.MeshBasicMaterial( { color: 0x7396ae, side: THREE.BackSide,transparent:true,opacity:0.6} );
  const cageMaterialTop = new THREE.MeshBasicMaterial( { color: 0x7396ae, side: THREE.BackSide,transparent:true,opacity:0.6} );
  const cageMaterialBottom = new THREE.MeshBasicMaterial( { color: 0x000000, side: THREE.BackSide,transparent:true,opacity:0} );
  const cageMaterialLeft = new THREE.MeshBasicMaterial( { color: 0x7396ae, side: THREE.BackSide,transparent:true,opacity:0.6} );
  const cageMaterialRight = new THREE.MeshBasicMaterial( { color: 0x7396ae, side: THREE.BackSide,transparent:true,opacity:0.6} );
  
  let cageMaterial = [cageMaterialBack,cageMaterialFront,cageMaterialTop,cageMaterialBottom,cageMaterialLeft,cageMaterialRight];
  
  return (
    <mesh material={cageMaterial}{...props}>
      <boxGeometry attach="geometry" args={[(62+90)/SCALE,30/SCALE,(62+90)/SCALE]} />
    </mesh>
  );
};
const Plane = (props) => {
  return (
    <mesh material={new THREE.MeshStandardMaterial( { color: 0xdddddd, side: THREE.DoubleSide, wireframe:false} )} receiveShadow {...props}>
      <boxGeometry castShadow receiveShadow attach="geometry" args={[(62+90)/SCALE,10/SCALE,(62+90)/SCALE]} />
    </mesh>
  );
};

const Model = ({ url, position, name, rotation, onLoadCallback, scale,mat_index=0}) => {

  const { scene } = useGLTF(url);

  scene.castShadow = true;
  const mat_library = {
    0:new THREE.MeshStandardMaterial({ color: 0x989C9F, wireframe:false, roughness:0.6, metalness:1, side: THREE.DoubleSide}),
    1:new THREE.MeshStandardMaterial({ color: 0xAD9572, wireframe:false, roughness:0.6, metalness:1, side: THREE.DoubleSide}),
    2:new THREE.MeshStandardMaterial({ color: 0x9C9C9C, wireframe:false, roughness:0.6, metalness:1, side: THREE.DoubleSide}),
    3:new THREE.MeshStandardMaterial({ color: 0xA49080, wireframe:false, roughness:0.6, metalness:1, side: THREE.DoubleSide}),
    4:new THREE.MeshStandardMaterial({ color: 0x7B7D7F, wireframe:false, roughness:0.6, metalness:1, side: THREE.DoubleSide}),
    5:new THREE.MeshStandardMaterial({ color: 0xEFEADE, wireframe:false, roughness:0.6, metalness:1, side: THREE.DoubleSide}),
    6:new THREE.MeshStandardMaterial({ color: 0x585147, wireframe:false, roughness:0.6, metalness:1, side: THREE.DoubleSide}),
    7:new THREE.MeshStandardMaterial({ color: 0x62696E, wireframe:false, roughness:0.6, metalness:1, side: THREE.DoubleSide}),
    8:new THREE.MeshStandardMaterial({ color: 0x2B2F23, wireframe:false, roughness:0.2, metalness:1, side: THREE.DoubleSide}),
    9:new THREE.MeshToonMaterial({ color: 0x405461, side: THREE.DoubleSide}),
    10: new THREE.MeshToonMaterial( { color: 0x91BDDB, side: THREE.BackSide,opacity:0.9}),
  }
  scene.traverse((child) => {
    if (child.isMesh) {
      child.material = mat_library[mat_index];
      child.geometry.castShadow = true;
      child.castShadow = true;
    }})
  const calculateDimensions = (scene) => {
    const box = new THREE.Box3().setFromObject(scene);
    return {
      width: box.max.x - box.min.x,
      height: box.max.y - box.min.y,
      depth: box.max.z - box.min.z,
    };
  };

  const modelDimensions = useMemo(() => calculateDimensions(scene), [scene]);

  // Invoke the callback with dimensions when the model is loaded
  useMemo(() => {
    onLoadCallback && onLoadCallback(modelDimensions);
  }, [onLoadCallback, modelDimensions]);

  const clonedScene = useMemo(() => {
    const clonedScene = scene.clone(true);
    clonedScene.traverse((child) => {
      if (child.isMesh) {
        child.material = mat_library[mat_index];
        child.geometry.castShadow = true;
        child.castShadow = true;
      }
    });
    clonedScene.castShadow = true;

    // onLoadCallback(clonedScene)
    return clonedScene;
  }, [scene,mat_index]);

  
  return <primitive castShadow rotation={rotation} scale={scale} object={clonedScene} position={position} name={name}/>;
};

const buildLattice = (attrs,pos=[0,0,-attrs.projection/(2*SCALE)],limit=90) => {

  function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }

    return result;
  }
  const [colDims, setColDims] = useState({"width": 0,"height": 0,"depth": 0});
  const [rafterDims, setRafterDims] = useState({"width":0,"height":0,"depth":0});
  const [beamDims, setBeamDims] = useState({"width":0,"height":0,"depth":0});
  const [latticeDims, setLatticeDims] = useState({"width":0,"height":0,"depth":0});
  const [rafterEndDims, setRafterEndDims] = useState({"width":0,"height":0,"depth":0});
  const [beamEndDims, setBeamEndDims] = useState({"width":0,"height":0,"depth":0});
  
  const ends = ["./models/beveled.glb","./models/mitered.glb","./models/corbel.glb","./models/scallop.glb"]
  
  const cageMaterialFront = new THREE.MeshBasicMaterial( { color: 0xd0d0d0, side: THREE.DoubleSide,transparent:true,opacity:0.25});
  const cageMaterialBack = new THREE.MeshBasicMaterial( { color: 0xd0d0d0, side: THREE.DoubleSide,transparent:true,opacity:0.25});
  const cageMaterialTop = new THREE.MeshBasicMaterial( { color: 0xd0d0d0, side: THREE.DoubleSide,transparent:true,opacity:0.25});
  const cageMaterialBottom = new THREE.MeshBasicMaterial( { color: 0x000000, side: THREE.DoubleSide,transparent:true,opacity:0} );
  const cageMaterialLeft = new THREE.MeshBasicMaterial( { color: 0xd0d0d0, side: THREE.DoubleSide,transparent:true,opacity:0.25});
  const cageMaterialRight = new THREE.MeshBasicMaterial( { color: 0xd0d0d0, side: THREE.DoubleSide,transparent:true,opacity:0.25});
  let cageMaterial = [cageMaterialBack,cageMaterialFront,cageMaterialTop,cageMaterialBottom,cageMaterialLeft,cageMaterialRight];
  const rafterSize = attrs.rafterSize*0.125/SCALE;
  let columns = [];
  let posts = [];
  posts.push(<Model key={null} url="./models/lattice_column.glb" position={THRASH} name={"column"} rotation={[0, Math.PI / 2, 0]} onLoadCallback={setColDims}/>)
  let width = attrs.width/SCALE;
  let projection = attrs.projection/SCALE;
  let height = attrs.height/SCALE;
  var numberOfColumns = 2;
  if(width>=limit/SCALE){
    width=limit/SCALE;
  }
  if(limit==90){
    if(width <= 22/SCALE){
      numberOfColumns = 2;
    }
    else if(width <= 34/SCALE){
      numberOfColumns = 3;
    }
    else if(width <= 45/SCALE){
      numberOfColumns = 4;
    }
    else if(width <= 56/SCALE){
      numberOfColumns = 5;
    }
    else if(width <= 68/SCALE){
      numberOfColumns = 6;
    }
    else if(width <= 79/SCALE){
      numberOfColumns = 7;
    }
    else if(width <= 90/SCALE){
      numberOfColumns = 8;
    }
  }
  else{
    if(width <= 22/SCALE){
      numberOfColumns = 2;
    }
    else if(width <= 34/SCALE){
      numberOfColumns = 3;
    }
    else if(width <= 45/SCALE){
      numberOfColumns = 4;
    }
    else{
      numberOfColumns = 4;
    }
  }
// ---------------------------COLS---------------------------------
  const colHeightScale = colDims ? height / colDims.height : 1;
  if(attrs.mountMode!=3){
    for (let i = 0; i < numberOfColumns; i++) {
      const position = [i * ((width-colDims.width)/(numberOfColumns-1)) - width/2 +colDims.width/2, 0, projection];
      columns.push(<Model key={i} url="./models/lattice_column.glb"position={position} name={"column"} rotation={[0, Math.PI / 2, 0]} scale={[1, colHeightScale,1]} mat_index={[attrs.materials['cover']]}/>);
      posts.push(<Model key={i} url="./models/lattice_post.glb" position={position} name={"post"} rotation={[0, Math.PI / 2, 0]} scale={[1, colHeightScale,1]} mat_index={[attrs.materials['post']]}/>);
    }
  }
  else{
    columns = [];
    posts = [];
      for (let i = 0; i < numberOfColumns; i++) {
        for(let n=0;n<2;n++){
        const position = [i * ((width-colDims.width)/(numberOfColumns-1)) - width/2 +colDims.width/2, 0, (projection-colDims.width)*n+colDims.width/2];
        columns.push(<Model key={generateRandomString(i+5)} url="./models/lattice_column.glb"position={position} name={"column"} rotation={[0, Math.PI / 2, 0]} scale={[1, colHeightScale,1]} mat_index={[attrs.materials['cover']]}/>);
        posts.push(<Model key={generateRandomString(i+5)} url="./models/lattice_post.glb" position={position} name={"post"} rotation={[0, Math.PI / 2, 0]} scale={[1, colHeightScale,1]} mat_index={[attrs.materials['post']]}/>);
        columns.push(<mesh key={generateRandomString(i+5)} material={cageMaterial} receiveShadow={true} castShadow={true} position={[i * ((width-colDims.width)/(numberOfColumns-1)) - width/2 +colDims.width/2, 0, (projection-colDims.width)*n+colDims.width/2]}>
        <boxGeometry attach="geometry" args={[2/SCALE,0.5/SCALE,2/SCALE]} />
      </mesh>)
      }
    }
  }
// ---------------------------END COLS---------------------------------
  
// ---------------------------BEAMS---------------------------------
const beams = [];
const beamEnds = []; 
beams.push(<Model key={null} url=".\models\lattice_beam.glb"position={THRASH} name={"beam"} rotation={[0, Math.PI / 2, 0]} onLoadCallback={setBeamDims}/>)
beamEnds.push(<Model key={null} url={ends[attrs.selectedEnd]} position={THRASH} name={"beam"} rotation={[0, Math.PI / 2, 0]} onLoadCallback={setBeamEndDims}/>)

const beamWidthScale = beamDims ? width / beamDims.depth : 1;
if(attrs.mountMode!=3){
  if(!attrs.selectedHead){
    for (let i = 0; i < 1; i++) {
      const position = [0, height-beamDims.height/2,projection];
      beams.push(<Model key={i} url=".\models\lattice_beam.glb"position={position} name={"beam"} rotation={[0, Math.PI / 2, 0]} scale={[1,1, beamWidthScale+0.3/SCALE]} mat_index={[attrs.materials['beam']]}/>);
    }
    const beamEnd1Position = [0.5*width+0.5/SCALE, height-beamDims.height/2,projection];
    const beamEnd2Position = [-0.5*width-0.5/SCALE, height-beamDims.height/2,projection];
    beamEnds.push(<Model key={0} url={ends[attrs.selectedEnd]}position={beamEnd1Position} name={"beam"} scale={[1,1,1]}mat_index={[attrs.materials['beam']]}/>);
    beamEnds.push(<Model key={1} url={ends[attrs.selectedEnd]}position={beamEnd2Position} name={"beam"} rotation={[0,Math.PI,0]} scale={[1,1,1]}mat_index={[attrs.materials['beam']]}/>);
  }
  else{
    for(let n = 0; n<2;n++){
      for (let i = 0; i < 1; i++) {
        const position = [0, height-beamDims.height/2,(projection)-0.5*colDims.width+n*colDims.width];
        beams.push(<Model key={generateRandomString(5)} url=".\models\lattice_beam.glb"position={position} name={"beam"} rotation={[0, Math.PI / 2, 0]} scale={[1,1,beamWidthScale+0.3/SCALE]} mat_index={[attrs.materials['beam']]}/>);
      }
      const beamEnd1Position = [0.5*width+0.5/SCALE, height-beamDims.height/2,(projection)-0.5*colDims.width+n*colDims.width];
      const beamEnd2Position = [-0.5*width-0.5/SCALE, height-beamDims.height/2,(projection)-0.5*colDims.width+n*colDims.width];
      beamEnds.push(<Model key={generateRandomString(5)} url={ends[attrs.selectedEnd]}position={beamEnd1Position} name={"beam"} scale={[1,1,1]}/>);
      beamEnds.push(<Model key={generateRandomString(5)} url={ends[attrs.selectedEnd]}position={beamEnd2Position} name={"beam"} rotation={[0,Math.PI,0]} scale={[1,1,1]} mat_index={[attrs.materials['beam']]}/>);

    }
  }
  
}
else{
  if(!attrs.selectedHead){
    for(let n=0;n<2;n++){
      for (let i = 0; i < 1; i++) {
        const position = [0, height-beamDims.height/2,(projection-colDims.width)*n+colDims.width/2];
        beams.push(<Model key={generateRandomString(5)} url=".\models\lattice_beam.glb"position={position} name={"beam"} rotation={[0, Math.PI / 2, 0]} scale={[1,1, beamWidthScale+0.3/SCALE]} mat_index={[attrs.materials['beam']]}/>);
      }
      const beamEnd1Position = [0.5*width+0.5/SCALE, height-beamDims.height/2,(projection-colDims.width)*n+colDims.width/2];
      const beamEnd2Position = [-0.5*width-0.5/SCALE, height-beamDims.height/2,(projection-colDims.width)*n+colDims.width/2];
      beamEnds.push(<Model key={generateRandomString(5)} url={ends[attrs.selectedEnd]}position={beamEnd1Position} name={"beam"} scale={[1,1,1]}/>);
      beamEnds.push(<Model key={generateRandomString(5)} url={ends[attrs.selectedEnd]}position={beamEnd2Position} name={"beam"} rotation={[0,Math.PI,0]} scale={[1,1,1]} mat_index={[attrs.materials['beam']]}/>);
    }
  }
  else{
    for(let n = 0; n<2;n++){
      for (let i = 0; i < 2; i++) {
        const position = [0,height-beamDims.height/2,(projection-colDims.width)*n+colDims.width*i];
        beams.push(<Model key={generateRandomString(5)} url=".\models\lattice_beam.glb"position={position} name={"beam"} rotation={[0, Math.PI / 2, 0]} scale={[1,1,beamWidthScale+0.3/SCALE]} mat_index={[attrs.materials['beam']]}/>);
        const beamEnd1Position = [0.5*width+0.5/SCALE, height-beamDims.height/2,(projection-colDims.width)*n+colDims.width*i];
        const beamEnd2Position = [-0.5*width-0.5/SCALE, height-beamDims.height/2,(projection-colDims.width)*n+colDims.width*i];
        beamEnds.push(<Model key={generateRandomString(5)} url={ends[attrs.selectedEnd]}position={beamEnd1Position} name={"beam"} scale={[1,1,1]}/>);
        beamEnds.push(<Model key={generateRandomString(5)} url={ends[attrs.selectedEnd]}position={beamEnd2Position} name={"beam"} rotation={[0,Math.PI,0]} scale={[1,1,1]} mat_index={[attrs.materials['beam']]}/>);
      }
    }
  }
}
// ---------------------------END BEAMS---------------------------------
// ---------------------------RAFTERS---------------------------------
const rafters = [];
const rafterEnds = [];
rafters.push(<Model key={null} url=".\models\lattice_one_sided_beam.glb"position={THRASH} name={"rafter"} rotation={[0, Math.PI / 2, 0]} onLoadCallback={setRafterDims}/>)
rafterEnds.push(<Model key={null} url={ends[attrs.selectedRafterEndCaps]} position={THRASH} name={"rafter"} rotation={[0, Math.PI / 2, 0]} onLoadCallback={setRafterEndDims}/>)

const spacingBeams = 2.5/SCALE;

const rafterProjectionScale = rafterDims ? (projection) / rafterDims.width : 1;
let numberOfBeams = Math.floor(width/spacingBeams);
if(attrs.mountMode!=3){
  for (let i = 0; i <= numberOfBeams; i++) {
    const position = [i*((width-4*rafterDims.depth)/numberOfBeams)-width/2+2*rafterDims.depth, height+rafterDims.height/2,projection/2+.2/SCALE];
    rafters.push(<Model key={i} url=".\models\lattice_one_sided_beam.glb"position={position} name={"rafter"} rotation={[0, Math.PI / 2, 0]} scale={[rafterProjectionScale+.2/SCALE, 1,1]} mat_index={[attrs.materials['rafter']]}/>);
    const rafterEnd1Position = [i*((width-4*rafterDims.depth)/numberOfBeams)-width/2+2*rafterDims.depth, height+rafterDims.height/2,projection+.5/SCALE];
    rafterEnds.push(<Model key={i} url={ends[attrs.selectedRafterEndCaps]}position={rafterEnd1Position} name={"rafter"} rotation={[0, -Math.PI / 2, 0]} scale={[1,1,1]} mat_index={[attrs.materials['rafter']]}/>);
  }
}
else{
  for (let i = 0; i <= numberOfBeams; i++) {
    const position = [i*((width-4*rafterDims.depth)/numberOfBeams)-width/2+2*rafterDims.depth, height+rafterDims.height/2,projection/2];
    rafters.push(<Model key={generateRandomString(5)} url=".\models\lattice_one_sided_beam.glb"position={position} name={"rafter"} rotation={[0, Math.PI / 2, 0]} scale={[rafterProjectionScale+0.5/SCALE, 1,1]} mat_index={[attrs.materials['rafter']]}/>);
    for(let n=0;n<2;n++){
      const rafterEnd1Position = [i*((width-4*rafterDims.depth)/numberOfBeams)-width/2+2*rafterDims.depth, height+rafterDims.height/2,n*(projection+1/SCALE)-0.5/SCALE];
      rafterEnds.push(<Model key={generateRandomString(5)} url={ends[attrs.selectedRafterEndCaps]}position={rafterEnd1Position} name={"rafter"} rotation={[0, n*2*-Math.PI / 2+Math.PI/2, 0]} scale={[1,1,1]} mat_index={[attrs.materials['rafter']]}/>);
    }
  }

}
// ---------------------------END RAFTERS---------------------------------

// ---------------------------LATTICES---------------------------------
const lattices = [];
lattices.push(<Model key={null} url=".\models\lattice_rafter.glb" position={THRASH} name={"lattice"} rotation={[0, Math.PI / 2, 0]} onLoadCallback={setLatticeDims}/>)

const spacingRafters = rafterSize;



const latticeWidthScale = latticeDims ? width / latticeDims.depth : 1;
let numberOfRafters = Math.floor(projection/spacingRafters);
for (let i = 0; i <= numberOfRafters; i++) {
  const position = [0, height+beamDims.height,i*(projection/numberOfRafters)];
  lattices.push(<Model key={i} url=".\models\lattice_rafter.glb" position={position} name={"lattice"} rotation={[0, Math.PI / 2, 0]} scale={[1,1,latticeWidthScale]} mat_index={[attrs.materials['option']]}/>);
}
// ---------------------------END LATTICES---------------------------------
let cbs =  null;
if(attrs.mountMode!=3){
  if(attrs.mountMode==0){
    cbs = (
      <mesh material={cageMaterial} receiveShadow={true} castShadow={true} position={[0,attrs.height/(2*SCALE),-1/SCALE]}>
        <boxGeometry attach="geometry" args={[width,height+beamDims.height+2*rafterDims.height+1/SCALE,2/SCALE]} />
      </mesh>
    );
  }
  else if(attrs.mountMode==1){
    cbs = (
      <mesh material={cageMaterial} receiveShadow={true} castShadow={true} position={[0,attrs.height/(2*SCALE),-1/SCALE]}>
        <boxGeometry attach="geometry" args={[width,height+beamDims.height+2*rafterDims.height,2/SCALE]} />
      </mesh>
    );
  }
  else{
    cbs = (
      <mesh material={cageMaterial} receiveShadow={true} castShadow={true} position={[0,attrs.height/(2*SCALE),-1/SCALE]}>
        <boxGeometry attach="geometry" args={[width,height,2/SCALE]} />
      </mesh>
    );
  }
}
else{
  cbs = null
}
return (<group position={pos}>
    {columns}
    {posts}
    {rafterEnds}
    {rafters}
    {beamEnds}
    {beams}
    {lattices}
    {cbs}
  </group>)
  
}

const buildInsulated = (attrs,pos=[0,0,-attrs.projection/(2*SCALE)],limit=90) => {

  function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }

    return result;
  }
  const [colDims, setColDims] = useState({"width": 0,"height": 0,"depth": 0});
  const [rafterDims, setRafterDims] = useState({"width":0,"height":0,"depth":0});
  const [beamDims, setBeamDims] = useState({"width":0,"height":0,"depth":0});
  const [latticeDims, setLatticeDims] = useState({"width":0,"height":0,"depth":0});
  const [rafterEndDims, setRafterEndDims] = useState({"width":0,"height":0,"depth":0});
  const [beamEndDims, setBeamEndDims] = useState({"width":0,"height":0,"depth":0});
  
  const ends = ["./models/beveled.glb","./models/mitered.glb","./models/corbel.glb","./models/scallop.glb"]
  
  const cageMaterialFront = new THREE.MeshBasicMaterial( { color: 0xd0d0d0, side: THREE.DoubleSide,transparent:true,opacity:0.25});
  const cageMaterialBack = new THREE.MeshBasicMaterial( { color: 0xd0d0d0, side: THREE.DoubleSide,transparent:true,opacity:0.25});
  const cageMaterialTop = new THREE.MeshBasicMaterial( { color: 0xd0d0d0, side: THREE.DoubleSide,transparent:true,opacity:0.25});
  const cageMaterialBottom = new THREE.MeshBasicMaterial( { color: 0x000000, side: THREE.DoubleSide,transparent:true,opacity:0} );
  const cageMaterialLeft = new THREE.MeshBasicMaterial( { color: 0xd0d0d0, side: THREE.DoubleSide,transparent:true,opacity:0.25});
  const cageMaterialRight = new THREE.MeshBasicMaterial( { color: 0xd0d0d0, side: THREE.DoubleSide,transparent:true,opacity:0.25});
  let cageMaterial = [cageMaterialBack,cageMaterialFront,cageMaterialTop,cageMaterialBottom,cageMaterialLeft,cageMaterialRight];
  const rafterSize = attrs.rafterSize*0.125/SCALE;
  let columns = [];
  let posts = [];
  posts.push(<Model key={null} url="./models/lattice_column.glb" position={THRASH} name={"column"} rotation={[0, Math.PI / 2, 0]} onLoadCallback={setColDims}/>)
  let width = attrs.width/SCALE;
  let projection = attrs.projection/SCALE;
  let height = attrs.height/SCALE;

  var numberOfColumns = 2;
  if(width>=limit/SCALE){
    width=limit/SCALE;
  }
  if(limit==90){
    if(width <= 22/SCALE){
      numberOfColumns = 2;
    }
    else if(width <= 34/SCALE){
      numberOfColumns = 3;
    }
    else if(width <= 45/SCALE){
      numberOfColumns = 4;
    }
    else if(width <= 56/SCALE){
      numberOfColumns = 5;
    }
    else if(width <= 68/SCALE){
      numberOfColumns = 6;
    }
    else if(width <= 79/SCALE){
      numberOfColumns = 7;
    }
    else if(width <= 90/SCALE){
      numberOfColumns = 8;
    }
  }
  else{
    if(width <= 22/SCALE){
      numberOfColumns = 2;
    }
    else if(width <= 34/SCALE){
      numberOfColumns = 3;
    }
    else if(width <= 45/SCALE){
      numberOfColumns = 4;
    }
    else{
      numberOfColumns = 4;
    }
  }
// ---------------------------COLS---------------------------------
  const colHeightScale = colDims ? height / colDims.height : 1;
  if(attrs.mountMode!=3){
    for (let i = 0; i < numberOfColumns; i++) {
      const position = [i * ((width-colDims.width)/(numberOfColumns-1)) - width/2 +colDims.width/2, 0, projection];
      columns.push(<Model key={i} url="./models/lattice_column.glb"position={position} name={"column"} rotation={[0, Math.PI / 2, 0]} scale={[1, colHeightScale,1]} mat_index={[attrs.materials['cover']]}/>);
      posts.push(<Model key={i} url="./models/lattice_post.glb" position={position} name={"post"} rotation={[0, Math.PI / 2, 0]} scale={[1, colHeightScale,1]} mat_index={[attrs.materials['post']]}/>);
    }
  }
  else{
    columns = [];
    posts = [];
      for (let i = 0; i < numberOfColumns; i++) {
        for(let n=0;n<2;n++){
        const position = [i * ((width-colDims.width)/(numberOfColumns-1)) - width/2 +colDims.width/2, 0, (projection-colDims.width)*n+colDims.width/2];
        columns.push(<Model key={generateRandomString(i+5)} url="./models/lattice_column.glb"position={position} name={"column"} rotation={[0, Math.PI / 2, 0]} scale={[1, colHeightScale,1]} mat_index={[attrs.materials['cover']]}/>);
        posts.push(<Model key={generateRandomString(i+5)} url="./models/lattice_post.glb" position={position} name={"post"} rotation={[0, Math.PI / 2, 0]} scale={[1, colHeightScale,1]} mat_index={[attrs.materials['post']]}/>);
        columns.push(<mesh key={generateRandomString(i+5)} material={cageMaterial} receiveShadow={true} castShadow={true} position={[i * ((width-colDims.width)/(numberOfColumns-1)) - width/2 +colDims.width/2, 0, (projection-colDims.width)*n+colDims.width/2]}>
        <boxGeometry attach="geometry" args={[2/SCALE,0.5/SCALE,2/SCALE]} />
      </mesh>)
      }
    }
  }
// ---------------------------END COLS---------------------------------
  
// ---------------------------BEAMS---------------------------------
const beams = [];
const beamEnds = []; 
beams.push(<Model key={null} url=".\models\lattice_beam.glb"position={THRASH} name={"beam"} rotation={[0, Math.PI / 2, 0]} onLoadCallback={setBeamDims}/>)
beamEnds.push(<Model key={null} url={ends[attrs.selectedEnd]} position={THRASH} name={"beam"} rotation={[0, Math.PI / 2, 0]} onLoadCallback={setBeamEndDims}/>)

const beamWidthScale = beamDims ? width / beamDims.depth : 1;
if(attrs.mountMode!=3){
  if(!attrs.selectedHead){
    for (let i = 0; i < 1; i++) {
      const position = [0, height-beamDims.height/2,projection];
      beams.push(<Model key={i} url=".\models\lattice_beam.glb"position={position} name={"beam"} rotation={[0, Math.PI / 2, 0]} scale={[1,1, beamWidthScale+0.3/SCALE]} mat_index={[attrs.materials['beam']]}/>);
    }
    const beamEnd1Position = [0.5*width+.5/SCALE, height-beamDims.height/2,projection];
    const beamEnd2Position = [-0.5*width-.5/SCALE, height-beamDims.height/2,projection];
    beamEnds.push(<Model key={0} url={ends[attrs.selectedEnd]}position={beamEnd1Position} name={"beam"} scale={[1,1,1]}mat_index={[attrs.materials['beam']]}/>);
    beamEnds.push(<Model key={1} url={ends[attrs.selectedEnd]}position={beamEnd2Position} name={"beam"} rotation={[0,Math.PI,0]} scale={[1,1,1]}mat_index={[attrs.materials['beam']]}/>);
  }
  else{
    for(let n = 0; n<2;n++){
      for (let i = 0; i < 1; i++) {
        const position = [0, height-beamDims.height/2,(projection)-0.5*colDims.width+n*colDims.width];
        beams.push(<Model key={generateRandomString(5)} url=".\models\lattice_beam.glb"position={position} name={"beam"} rotation={[0, Math.PI / 2, 0]} scale={[1,1,beamWidthScale+0.3/SCALE]} mat_index={[attrs.materials['beam']]}/>);
      }
      const beamEnd1Position = [0.5*width+0.5/SCALE, height-beamDims.height/2,(projection)-0.5*colDims.width+n*colDims.width];
      const beamEnd2Position = [-0.5*width+0.5/SCALE, height-beamDims.height/2,(projection)-0.5*colDims.width+n*colDims.width];
      beamEnds.push(<Model key={generateRandomString(5)} url={ends[attrs.selectedEnd]}position={beamEnd1Position} name={"beam"} scale={[1,1,1]}/>);
      beamEnds.push(<Model key={generateRandomString(5)} url={ends[attrs.selectedEnd]}position={beamEnd2Position} name={"beam"} rotation={[0,Math.PI,0]} scale={[1,1,1]} mat_index={[attrs.materials['beam']]}/>);

    }
  }
  
}
else{
  if(!attrs.selectedHead){
    for(let n=0;n<2;n++){
      for (let i = 0; i < 1; i++) {
        const position = [0, height-beamDims.height/2,(projection-colDims.width)*n+colDims.width/2];
        beams.push(<Model key={generateRandomString(5)} url=".\models\lattice_beam.glb"position={position} name={"beam"} rotation={[0, Math.PI / 2, 0]} scale={[1,1, beamWidthScale+0.3/SCALE]} mat_index={[attrs.materials['beam']]}/>);
      }
      const beamEnd1Position = [0.5*width+0.5/SCALE, height-beamDims.height/2,(projection-colDims.width)*n+colDims.width/2];
      const beamEnd2Position = [-0.5*width-0.5/SCALE, height-beamDims.height/2,(projection-colDims.width)*n+colDims.width/2];
      beamEnds.push(<Model key={generateRandomString(5)} url={ends[attrs.selectedEnd]}position={beamEnd1Position} name={"beam"} scale={[1,1,1]}/>);
      beamEnds.push(<Model key={generateRandomString(5)} url={ends[attrs.selectedEnd]}position={beamEnd2Position} name={"beam"} rotation={[0,Math.PI,0]} scale={[1,1,1]} mat_index={[attrs.materials['beam']]}/>);
    }
  }
  else{
    for(let n = 0; n<2;n++){
      for (let i = 0; i < 2; i++) {
        const position = [0,height-beamDims.height/2,(projection-colDims.width)*n+colDims.width*i];
        beams.push(<Model key={generateRandomString(5)} url=".\models\lattice_beam.glb"position={position} name={"beam"} rotation={[0, Math.PI / 2, 0]} scale={[1,1,beamWidthScale+0.3/SCALE]} mat_index={[attrs.materials['beam']]}/>);
        const beamEnd1Position = [0.5*width+0.5/SCALE, height-beamDims.height/2,(projection-colDims.width)*n+colDims.width*i];
        const beamEnd2Position = [-0.5*width-0.5/SCALE, height-beamDims.height/2,(projection-colDims.width)*n+colDims.width*i];
        beamEnds.push(<Model key={generateRandomString(5)} url={ends[attrs.selectedEnd]}position={beamEnd1Position} name={"beam"} scale={[1,1,1]}/>);
        beamEnds.push(<Model key={generateRandomString(5)} url={ends[attrs.selectedEnd]}position={beamEnd2Position} name={"beam"} rotation={[0,Math.PI,0]} scale={[1,1,1]} mat_index={[attrs.materials['beam']]}/>);
      }
    }
  }
}
// ---------------------------END BEAMS---------------------------------
// ---------------------------RAFTERS---------------------------------
const rafters = [];
const rafterEnds = [];
rafters.push(<Model key={null} url=".\models\lattice_one_sided_beam.glb"position={THRASH} name={"rafter"} rotation={[0, Math.PI / 2, 0]} onLoadCallback={setRafterDims}/>)
rafterEnds.push(<Model key={null} url={ends[attrs.selectedRafterEndCaps]} position={THRASH} name={"rafter"} rotation={[0, Math.PI / 2, 0]} onLoadCallback={setRafterEndDims}/>)

const spacingBeams = 4/SCALE;

const rafterProjectionScale = rafterDims ? (projection) / rafterDims.width : 1;
let numberOfBeams = Math.floor(width/spacingBeams);
if(attrs.mountMode!=3){
  for (let i = 0; i <= numberOfBeams; i++) {
    const position = [i*((width)/numberOfBeams)-width/2, height+rafterDims.height/2,projection+0.3/SCALE];
    rafters.push(<Model key={i} url=".\models\lattice_one_sided_beam.glb"position={position} name={"rafter"} rotation={[0, Math.PI / 2, 0]} scale={[rafterEndDims.depth+0.1/SCALE, 1,1]} mat_index={[attrs.materials['rafter']]}/>);
    const rafterEnd1Position = [i*((width)/numberOfBeams)-width/2, height+rafterDims.height/2,projection+0.5/SCALE];
    rafterEnds.push(<Model key={i} url={ends[attrs.selectedRafterEndCaps]}position={rafterEnd1Position} name={"rafter"} rotation={[0, -Math.PI / 2, 0]} scale={[1,1,1]} mat_index={[attrs.materials['rafter']]}/>);
  }
}
else{
  for (let i = 0; i <= numberOfBeams; i++) {
    for(let n=0;n<2;n++){
      const position = [i*((width)/numberOfBeams)-width/2, height+rafterDims.height/2,n*(projection+0.5/SCALE)-0.25/SCALE];
      rafters.push(<Model key={generateRandomString(5)} url=".\models\lattice_one_sided_beam.glb"position={position} name={"rafter"} rotation={[0, Math.PI / 2, 0]} scale={[rafterEndDims.depth+0.1/SCALE, 1,1]} mat_index={[attrs.materials['rafter']]}/>);
      const rafterEnd1Position = [i*((width)/numberOfBeams)-width/2, height+rafterDims.height/2,n*(projection-rafterEndDims.depth/2+1/SCALE)-0.5/SCALE];
      rafterEnds.push(<Model key={generateRandomString(5)} url={ends[attrs.selectedRafterEndCaps]}position={rafterEnd1Position} name={"rafter"} rotation={[0, n*2*-Math.PI / 2+Math.PI/2, 0]} scale={[1,1,1]} mat_index={[attrs.materials['rafter']]}/>);
    }
  }

}
// ---------------------------END RAFTERS---------------------------------

// ---------------------------INSULATEDS---------------------------------
const insulateds = [];
insulateds.push(<Model key={null} url=".\models\lattice_rafter.glb" position={THRASH} name={"insulated"} rotation={[0, Math.PI / 2, 0]} onLoadCallback={setLatticeDims}/>)

const spacingRafters = 4/SCALE;
const latticeWidthScale = latticeDims ? projection / latticeDims.depth : 1;
let numberOfRafters = Math.floor(width/(spacingRafters));
for (let i = 0; i <= numberOfRafters; i++) {
  const position = [width/numberOfRafters*i-width/2, height+beamDims.height/4,(projection/2)];
  insulateds.push(<Model key={i} url=".\models\lattice_rafter.glb" position={position} name={"insulated"} rotation={[0, 0, 0]} scale={[rafterSize/latticeDims.width,1,latticeWidthScale]} mat_index={[attrs.materials['option']]}/>);
}
const platePosition = [0,height,(projection/2)];
insulateds.push(<Model key={generateRandomString(5)} url=".\models\lattice_rafter.glb" position={platePosition} name={"insulated"} rotation={[0, Math.PI/2, 0]} scale={[projection/latticeDims.height,1,width/latticeDims.depth]} mat_index={[attrs.materials['option']]}/>);
for (let i = 0; i <= 1; i++) {
  const position1 = [0, height+beamDims.height/2,(projection*i)];
  insulateds.push(<Model key={generateRandomString(6)} url=".\models\lattice_rafter.glb" position={position1} name={"insulated"} rotation={[0, Math.PI/2, 0]} scale={[rafterSize/latticeDims.width,0.5/SCALE/latticeDims.height,width/latticeDims.depth]} mat_index={[attrs.materials['option']]}/>);
  const position2 = [(-width/2+latticeDims.width/2)+width*i, height+beamDims.height/2,(projection/2)];
  insulateds.push(<Model key={generateRandomString(6)} url=".\models\lattice_rafter.glb" position={position2} name={"insulated"} rotation={[0, 0, 0]} scale={[rafterSize/latticeDims.width,0.5/SCALE/latticeDims.height,projection/latticeDims.depth]} mat_index={[attrs.materials['option']]}/>);
  const position3 = [-width/2+width*i, height+beamDims.height/2,(projection/2)];
  insulateds.push(<Model key={generateRandomString(6)} url=".\models\lattice_rafter.glb" position={position3} name={"insulated"} rotation={[0, 0, 0]} scale={[rafterSize/latticeDims.width,0.5/SCALE/latticeDims.height,projection/latticeDims.depth]} mat_index={[attrs.materials['option']]}/>);
}
// ---------------------------END INSULATEDS---------------------------------
let cbs =  null;
if(attrs.mountMode!=3){
  if(attrs.mountMode==0){
    cbs = (
      <mesh material={cageMaterial} receiveShadow={false} castShadow={false} position={[0,attrs.height/(2*SCALE),-1/SCALE]}>
        <boxGeometry attach="geometry" args={[width,height+beamDims.height+2*rafterDims.height+1/SCALE,2/SCALE]} />
      </mesh>
    );
  }
  else if(attrs.mountMode==1){
    cbs = (
      <mesh material={cageMaterial} receiveShadow={false} castShadow={false} position={[0,attrs.height/(2*SCALE),-1/SCALE]}>
        <boxGeometry attach="geometry" args={[width,height+beamDims.height+2*rafterDims.height,2/SCALE]} />
      </mesh>
    );
  }
  else{
    cbs = (
      <mesh material={cageMaterial} receiveShadow={false} castShadow={false} position={[0,attrs.height/(2*SCALE),-1/SCALE]}>
        <boxGeometry attach="geometry" args={[width,height,2/SCALE]} />
      </mesh>
    );
  }
}
else{
  cbs = null
}
return (<group position={pos}>
    {columns}
    {posts}
    {rafterEnds}
    {rafters}
    {beamEnds}
    {beams}
    {insulateds}
    {cbs}
  </group>)
  
}
const buildLatticeAndInsulated = (attrs) =>{
  return (
    <group>
      {buildInsulated(attrs.leftAttrs,[-attrs.mixedRight*(attrs.leftAttrs.width>50?50:attrs.leftAttrs.width)/(2*SCALE),0,-attrs.projection/(2*SCALE)],50)}
      {buildLattice(attrs.rightAttrs,[attrs.mixedRight*(attrs.rightAttrs.width>50?50:attrs.rightAttrs.width)/(2*SCALE),0,-attrs.projection/(2*SCALE)],50)}
    </group>
  )
}

const buildMixed = (attrs) =>{
  if(attrs.isLatticeMiddle){
    if(attrs.middleAttrs ){
      return (
        <group>
            {buildInsulated(attrs.leftAttrs,[-(attrs.middleAttrs.width<50?attrs.middleAttrs.width:50)/(2*SCALE)-((attrs.leftAttrs.width<50?attrs.leftAttrs.width:50)/(2*SCALE)),0,-attrs.projection/(2*SCALE)],50)}
            {buildLattice(attrs.middleAttrs,[0,0,-attrs.projection/(2*SCALE)],50)}
            {buildInsulated(attrs.rightAttrs,[(attrs.middleAttrs.width<50?attrs.middleAttrs.width:50)/(2*SCALE)+((attrs.rightAttrs.width<50?attrs.rightAttrs.width:50)/(2*SCALE)),0,-attrs.projection/(2*SCALE)],50)}
        </group>
      )
    }
  }
  else{
    if(attrs.middleAttrs ){
      return (
        <group>
            {buildLattice(attrs.leftAttrs,[-(attrs.middleAttrs.width<50?attrs.middleAttrs.width:50)/(2*SCALE)-((attrs.leftAttrs.width<50?attrs.leftAttrs.width:50)/(2*SCALE)),0,-attrs.projection/(2*SCALE)],50)}
            {buildInsulated(attrs.middleAttrs,[0,0,-attrs.projection/(2*SCALE)],50)}
            {buildLattice(attrs.rightAttrs,[(attrs.middleAttrs.width<50?attrs.middleAttrs.width:50)/(2*SCALE)+((attrs.rightAttrs.width<50?attrs.rightAttrs.width:50)/(2*SCALE)),0,-attrs.projection/(2*SCALE)],50)}
        </group>
      )
    }
  }
}
const Pergola = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Set the timeout duration in milliseconds (e.g., 2000ms for 2 seconds)

    // Clear the timeout if the component unmounts before the timeout completes
    return () => clearTimeout(loadingTimeout);
  }, []); // The empty dependency array ensures the effect runs only once after the initial render


  const attrs = useConfigurator();

  let pergola;

  if(attrs){switch(attrs.model){
    case "lattice":
      pergola = buildLattice(attrs);
      break;
    case "insulated":
      pergola = buildInsulated(attrs);
      break;
    case "lattice-insulated":
      pergola = buildLatticeAndInsulated(attrs);
      break;
    case "mixed":
      pergola = buildMixed(attrs);
      break;
    default:
      pergola = (<>
      <Model url=".\models\pergalum_title.glb" position={[0,3/SCALE,0]} name={"insulated"} rotation={[0, Math.PI/2, 0]} scale={[1,1,1]} mat_index={9}></Model>
      <Model url=".\models\pergalum_title.glb" position={[0,3/SCALE,0]} name={"insulated"} rotation={[0, Math.PI/2, 0]} scale={[1.025,1.025,1.025]} mat_index={10}></Model>
      </>);
      break;
  }}
  return (
    <Canvas shadows={true}>
      <Environment files="./skybox.hdr" background />
      <ambientLight intensity={4} />
      <directionalLight castShadow={true} position={[10/SCALE, 15/SCALE, 10/SCALE]} shadow-mapSize={[1024, 1024]} intensity={3}>
        <orthographicCamera attach="shadow-camera" args={[-10, 10, 10, -10]} />
      </directionalLight>
      <OrbitControls
        makeDefault
        minPolarAngle={0}
        maxPolarAngle={Math.PI * 85/ 180}
        maxDistance={120/SCALE}
        target={[0,0,0]}
      />
      <Plane receiveShadow position={[0, -5/SCALE, 0]} />
      <Glass position={[0, 15/SCALE, 0]}/>
      {isLoading && (
        <>
          <Model url=".\models\pergalum_title.glb" position={[0,3/SCALE,0]} name={"insulated"} rotation={[0, Math.PI/2, 0]} scale={[1,1,1]} mat_index={9}></Model>
          <Model url=".\models\pergalum_title.glb" position={[0,3/SCALE,0]} name={"insulated"} rotation={[0, Math.PI/2, 0]} scale={[1.025,1.025,1.025]} mat_index={10}></Model>
        </>
      )}
      {!isLoading && (
        pergola
      )}
    </Canvas>
  );

};


export default Pergola;