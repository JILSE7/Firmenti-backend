import {v4 as uuidV4} from 'uuid';
import path from "path"
export const uploadFile = (file: any , extensionesValidas =  ['png', 'jpg', 'jpeg', 'gif'], carpeta = '') => {

  return new Promise((resolve, reject) => {

      //Extrayendo el archivp
          const archivo = file;
          console.log({archivo});
          const nombreCortado = archivo.originalname.split('.')
          const extension  =nombreCortado[nombreCortado.length- 1];
         //console.log(archivo.name.includes('.pdf'));    
     
         //validar extensiones
         if(!extensionesValidas.includes(extension)){
              return reject(`Archivo no valido ${extension} no permitida, solo se permite ${extensionesValidas} `)  
         }
     
         
         const nombreTem = uuidV4() + '.' + extension;
         //Construccion del path
         const uploadPath = path.join(__dirname ,'../uploads/',carpeta , nombreTem);
         
         archivo.mv(uploadPath, (err:any) =>  {
           if (err) {
             reject(err);
           }
         
           resolve(uploadPath)
         });

  })
}