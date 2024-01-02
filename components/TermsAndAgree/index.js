// import { Box, Typography } from "@mui/material";

// export default function TermsAndConditions() {
//   return (
//     <Box
//       sx={{
//         width: "300px", // Definir el ancho deseado
//         height: "400px", // Definir el alto deseado
//         overflowY: "auto", // Habilitar el scrollbar vertical
//         border: "1px solid black", // Opcional: agregar un borde
//         padding: "1rem",
//         "&::-webkit-scrollbar": {
//           // Estilos opcionales para el scrollbar (para navegadores basados en Webkit)
//           width: "6px",
//         },
//         "&::-webkit-scrollbar-thumb": {
//           background: "#888",
//           borderRadius: "4px",
//         },
//         "&::-webkit-scrollbar-thumb:hover": {
//           background: "#555",
//         },
//       }}
//     >
//       <Typography variant="body2">
//         Aquí van tus términos y condiciones. Puedes agregar todo el texto que
//         necesites y, si excede el tamaño del contenedor, aparecerá un scrollbar
//         vertical para permitir a los usuarios leer todo el contenido.
//         {/* Repetir el texto o agregar más contenido según lo necesites */}
//       </Typography>
//     </Box>
//   );
// }

import React from "react";
import { Box, Typography } from "@mui/material";

const TermsAndConditionsBox = () => {
  return (
    <Box
      sx={{
        width: "100%", // Fixed width
        height: "400px", // Fixed height
        overflowY: "auto", // Vertical scrollbar
        border: "1px solid black",
        padding: "16px",
        marginBottom: "16px",
      }}
    >
      {/* <Typography variant="h5">Terms and Conditions</Typography> */}
      <Typography variant="h6">DISCLAIMER FOR PERGALUM.NET</Typography>
      <Typography variant="body2">
        {/* Insert your long terms and conditions text here */}
        The information contained on the Pergalum.net website (the “Website”) is
        provided by Pergalum.net and while we endeavor to keep the information
        up to date and correct, we make no representations or warranties of any
        kind, express or implied, about the completeness, accuracy, reliability,
        suitability or availability with respect to the Website or the
        information, products, services, or related graphics contained on the
        Website for any purpose. Any reliance you place on such information is
        therefore strictly at your own risk.
        <br />
        In no event will we be liable for any loss or damage including without
        limitation, indirect or consequential loss or damage, or any loss or
        damage whatsoever arising from loss of data or profits arising out of,
        or in connection with, the use of the Website.
        <br /> Through the Website, you may be able to link to other websites
        which are not under the control of Pergalum.net. We have no control over
        the nature, content and availability of those sites. The inclusion of
        any links does not necessarily imply a recommendation or endorse the
        views expressed within them.
        <br /> Every effort is made to keep the Website up and running smoothly.
        However, Pergalum.net takes no responsibility for, and will not be
        liable for, the Website being temporarily unavailable due to technical
        issues beyond our control. While we use reasonable efforts to furnish
        accurate and up-to-date information, we do not warrant that any
        information contained in or made available through this website is
        accurate, complete, reliable, current or error-free. We assume no
        liability or responsibility for any errors or omissions in the content
        of this website.
        <br /> The Website may contain typographical errors, inaccuracies or
        other errors, and we make no representations about the accuracy,
        reliability, completeness, or timeliness of the Website or its contents.
        We cannot and do not guarantee that the Website will be free from
        viruses or other harmful components.
        <br /> The information contained on the Website is intended for general
        informational purposes only and should not be relied upon or used as the
        sole basis for making decisions without consulting primary, more
        accurate, more complete or more timely sources of information. Any
        reliance on the material on this Website is at your own risk.
        <br /> This Website Disclaimer is subject to change at any time without
        notice. By using the Website, you accept the current version of this
        Disclaimer as it appears on the Website at the time of your use
      </Typography>
    </Box>
  );
};

export default TermsAndConditionsBox;
