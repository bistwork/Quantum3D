import {useState} from 'react';

const PergolaOptionTab = ({attrs})=>{
    const [noLoginBoards, setBoards] = useState([0,6,7]);
    const [noLoginIndex, setIndex] = useState(0);

    
    if(attrs){
        let label;
        switch(attrs.model){
            case "lattice":
                label = "LATTICE";
                break;
            case "insulated":
                label = "INSULATED";
                break;
            case "mixed":
                label = "MIXED";
                break;
        }
        if(attrs.dealerId!=null){
            return <><div className="PergolaOptionTab">
                <span className="model">{label}</span>
                <div className="selection-buttons">
                    <button className={attrs.selectedBoard == 0? 'activeBoard' : ''} onClick={() => attrs.setSelectedBoard(0)}><svg width="24" height="24" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.8442 13.1549V6.77975C17.8439 6.50026 17.7701 6.22576 17.6302 5.98378C17.4904 5.74181 17.2893 5.54087 17.0473 5.40112L11.469 2.21353C11.2267 2.07364 10.9519 2 10.6721 2C10.3923 2 10.1175 2.07364 9.87518 2.21353L4.2969 5.40112C4.05485 5.54087 3.85381 5.74181 3.71394 5.98378C3.57407 6.22576 3.50029 6.50026 3.5 6.77975V13.1549C3.50029 13.4344 3.57407 13.7089 3.71394 13.9509C3.85381 14.1929 4.05485 14.3938 4.2969 14.5336L9.87518 17.7212C10.1175 17.861 10.3923 17.9347 10.6721 17.9347C10.9519 17.9347 11.2267 17.861 11.469 17.7212L17.0473 14.5336C17.2893 14.3938 17.4904 14.1929 17.6302 13.9509C17.7701 13.7089 17.8439 13.4344 17.8442 13.1549Z" stroke="#232323" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path><path d="M3.71484 5.95074L10.6718 9.97508L17.6287 5.95074" stroke="#232323" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path><path d="M10.6719 18V9.96729" stroke="#232323" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path></svg><span>DIMENSIONS</span></button>
                    <button className={attrs.selectedBoard == 1? 'activeBoard' : ''} onClick={() =>attrs.setSelectedBoard(1)}><svg xmlns="http://www.w3.org/2000/svg" width="21" height="24" fill="currentColor" className="bi bi-house" viewBox="0 0 16 16"><path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5ZM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5 5 5Z"/></svg><span>STRUCTURE</span></button>
                    <button className={attrs.selectedBoard == 2? 'activeBoard' : ''} onClick={() =>attrs.setSelectedBoard(2)}><svg className="special-header" width="22" height="24" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.4444 3H4.55556C3.69645 3 3 3.69645 3 4.55556V15.4444C3 16.3036 3.69645 17 4.55556 17H15.4444C16.3036 17 17 16.3036 17 15.4444V4.55556C17 3.69645 16.3036 3 15.4444 3Z" stroke="#232323" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path><path d="M7.66675 3V17" stroke="#232323" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path></svg><span>HEADER/ENDS</span></button>
                    <button className={attrs.selectedBoard == 3? 'activeBoard' : ''} onClick={() =>attrs.setSelectedBoard(3)}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="24" viewBox="0 0 24 24"><path fill="none" stroke="#000000" strokeWidth="1" d="M17,2 L17,22 L17,2 Z M12,2 L12,22 L12,2 Z M7,2 L7,22 L7,2 Z M2,22 L22,22 L22,2 L2,2 L2,22 Z"/></svg><span>POSTS</span></button>
                    <button className={attrs.selectedBoard == 4? 'activeBoard' : ''} onClick={() =>attrs.setSelectedBoard(4)}><svg width="20" height="24" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path strokeWidth="1"d="M7.5 1.5V13.5M1.5 7.5H13.5M1.5 1.5H13.5V13.5H1.5V1.5Z" stroke="#000000"></path></svg><span>RAFTER</span></button>
                    <button className={attrs.selectedBoard == 5? 'activeBoard' : ''} onClick={() =>attrs.setSelectedBoard(5)}><svg className="special-drop" width="29" height="24" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.1216 2L14.8092 6.68768C15.7363 7.61413 16.3678 8.79471 16.6238 10.0801C16.8798 11.3655 16.7488 12.6979 16.2475 13.9088C15.7461 15.1198 14.8969 16.1548 13.8072 16.8831C12.7175 17.6113 11.4363 18 10.1257 18C8.81508 18 7.5339 17.6113 6.44421 16.8831C5.35453 16.1548 4.5053 15.1198 4.00394 13.9088C3.50258 12.6979 3.37163 11.3655 3.62763 10.0801C3.88364 8.79471 4.51511 7.61413 5.44216 6.68768L10.1216 2Z" stroke="#232323" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path></svg><span>STYLING</span></button>
                    <button className={attrs.selectedBoard == 6? 'activeBoard' : ''} onClick={() =>attrs.setSelectedBoard(6)}><svg width="26" height="24" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 9.81818C2.5 9.81818 5.40909 4 10.5 4C15.5909 4 18.5 9.81818 18.5 9.81818C18.5 9.81818 15.5909 15.6364 10.5 15.6364C5.40909 15.6364 2.5 9.81818 2.5 9.81818Z" stroke="#232323" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path><path d="M10.5002 11.9999C11.7052 11.9999 12.682 11.023 12.682 9.81805C12.682 8.61306 11.7052 7.63623 10.5002 7.63623C9.29519 7.63623 8.31836 8.61306 8.31836 9.81805C8.31836 11.023 9.29519 11.9999 10.5002 11.9999Z" stroke="#232323" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path></svg><span>OVERVIEW</span></button>
                </div>
            </div></>;
        }
        else{
            console.log(noLoginBoards[noLoginIndex],attrs.selectedBoard)
            return <><div className="PergolaOptionTab">
                <span className="model">{label}</span>
                <div className="selection-buttons">
                    <button className={attrs.selectedBoard == 0? 'activeBoard' : ''} onClick={() => attrs.setSelectedBoard(0)}><svg width="24" height="24" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.8442 13.1549V6.77975C17.8439 6.50026 17.7701 6.22576 17.6302 5.98378C17.4904 5.74181 17.2893 5.54087 17.0473 5.40112L11.469 2.21353C11.2267 2.07364 10.9519 2 10.6721 2C10.3923 2 10.1175 2.07364 9.87518 2.21353L4.2969 5.40112C4.05485 5.54087 3.85381 5.74181 3.71394 5.98378C3.57407 6.22576 3.50029 6.50026 3.5 6.77975V13.1549C3.50029 13.4344 3.57407 13.7089 3.71394 13.9509C3.85381 14.1929 4.05485 14.3938 4.2969 14.5336L9.87518 17.7212C10.1175 17.861 10.3923 17.9347 10.6721 17.9347C10.9519 17.9347 11.2267 17.861 11.469 17.7212L17.0473 14.5336C17.2893 14.3938 17.4904 14.1929 17.6302 13.9509C17.7701 13.7089 17.8439 13.4344 17.8442 13.1549Z" stroke="#232323" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path><path d="M3.71484 5.95074L10.6718 9.97508L17.6287 5.95074" stroke="#232323" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path><path d="M10.6719 18V9.96729" stroke="#232323" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path></svg><span>DESIGN</span></button>
                    <button className={attrs.selectedBoard == 6? 'activeBoard' : ''} onClick={() =>attrs.setSelectedBoard(6)}><svg width="26" height="24" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 9.81818C2.5 9.81818 5.40909 4 10.5 4C15.5909 4 18.5 9.81818 18.5 9.81818C18.5 9.81818 15.5909 15.6364 10.5 15.6364C5.40909 15.6364 2.5 9.81818 2.5 9.81818Z" stroke="#232323" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path><path d="M10.5002 11.9999C11.7052 11.9999 12.682 11.023 12.682 9.81805C12.682 8.61306 11.7052 7.63623 10.5002 7.63623C9.29519 7.63623 8.31836 8.61306 8.31836 9.81805C8.31836 11.023 9.29519 11.9999 10.5002 11.9999Z" stroke="#232323" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path></svg><span>OVERVIEW</span></button>
                    <button className={attrs.selectedBoard == 7? 'activeBoard' : ''} onClick={() =>attrs.setSelectedBoard(7)}><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAABiUlEQVR4nO3UsUuXURTG8Y+VmaI0tQQ1BNpSg6RRRkQQQltIU7pEBEH9BRnhJBFB0CalU1MFLYHgJloN0dJWW2VuFtTQ0BIXzg8uL+8r980Chx64cM95L+d73od7LuXqQh9e4DvmI7dl7cDTKPop9rvxGufQs1XAGSxHt48wHfk5bOBH5Fv/zfEokjp+GLnpCuAWduENRtsU78cXXInu5xoAU7F/hvNtACewGvtr/wJwGouxT0X+A7aPRWdj/VXAMCZqzvTFRFcBaX6u4kApoEQdwGV8wH2sYagU0F1zpqcCmI236mDkbuNmKWAGC/HwdWxIkz6QAX7iZMQ7sYILpYA9ES/ElK/HS9rRXVzK4jt43lS8DtCBpHfpF8Y1K3X9HnvbAkaj81cVu3INhnVHNyteBxjJbMnt6qpc23cVqxp1CktZPJUNmIDcQ2+We4wHCnUIH0sP4zpeNlznRr3FxYJzY3H/97cpnnQsfL+BfTXfkz2T+ByW/pEO4wm+xfqarRSnu35kswq/AS7Zavym3XecAAAAAElFTkSuQmCC"/><span>DISCLAIMER</span></button>
                </div>
                <div className="tab-changer">
                    <button className={attrs.selectedBoard==0?'prev-button-disabled':"prev-button"} onClick={()=>{
                        attrs.setSelectedBoard(attrs.selectedBoard==0?0:(attrs.selectedBoard==6?0:6))
                    }}><span className="prev-disabled">PREVIOUS</span></button>
                    
                    <button className={attrs.selectedBoard==7?'prev-button-disabled':'next-button'} onClick={()=>{attrs.setSelectedBoard(attrs.selectedBoard==0?6:7)}}><span>NEXT</span></button>
                </div>
            </div></>;
        }
    }

};


export default PergolaOptionTab;

