import express from 'express';
const app = express();
import fileUpload from 'express-fileupload';
import 'dotenv/config';

import * as fs from 'fs/promises';

const photoFiles = document.getElementById("userPhoto").files;

if (photoFiles.length == 0) {
    alert('No files selected!');
} else {
    const formData = new FormData();
    formData.append("userPhoto", photoFiles[0]);
    try {
        const response = await fetch('/photos/upload', {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        console.log(data);
        // handle success
    } catch (error) {
        console.error(error);
        // handle error
    }
}

/*
const sendFiles = async()=>{
    const myfiles = document.getElementById('userPhoto').files
    const formData = new FormData()

    Object.keys(myfiles).forEach(key =>{
        formData.append(myfiles.item(key).name,myfiles.item(key))
    })

    const response = await fetch('/photos/upload', {
        method: 'POST',
        body: formData
    });
    const json = await response.json()
    console.log(json)
}

form.addEventListener('submit',(e) =>{
    e.preventDefault()
    sendFiles()
})
*/

