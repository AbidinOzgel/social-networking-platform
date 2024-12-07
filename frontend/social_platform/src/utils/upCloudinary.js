const cloudName="djpfxhq6s";
const uploadPreset="social_networking_platform";

export const upCloudinary=async(media,fileType)=>{

    if(media && fileType){
        const data=new FormData();
        data.append("file",media);
        data.append("upload_preset",uploadPreset);
        data.append("cloud_name",cloudName);

        const response=await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/${fileType}/upload`,
           { method:"Post",body:data}
        )

       

        const fileData=await response.json();
        if (response.ok) {
            console.log("file url", fileData.url);
            return fileData.url;
        } else {
            console.error("Cloudinary error:", fileData);
        }
        console.log("file url",fileData.url)

        return fileData.url
    }


}