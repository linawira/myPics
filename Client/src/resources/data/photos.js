import {inject} from 'aurelia-framework';
import {DataServices} from './data-services';

@inject(DataServices)
export class Photos {
    constructor(data) {
                this.data = data;
                this.PHOTO_SERVICE = 'photos';
                this.photoArray= new Array ();
         }

         async getPhotos(id){
            let response = await this.data.get(this.PHOTO_SERVICE + "/" + id);
            if(!response.error && !response.message){
                this.photoArray = response;
            }
        }         

async getUserPhoto(id){
    let response = await this.data.get(this.PHOTO_SERVICE + "/user/" + id);
    if(!response.error && !response.message){
        this.photosArray = response;
    }
} 

async save(photo){
    if(photo){
    if(!photo._id){
    let serverResponse = await this.data.post(photo, this.PHOTO_SERVICE);
    if(!serverResponse.error){
        this.photoArray.push(serverResponse);
    }
    return serverResponse;
        } else {
                let serverResponse = await this.data.put(photo, this.PHOTO_SERVICE + "/" + photo._id);
                if(!serverResponse.error){
                    // this.updateArray(response);
    // this.todosArray.forEach(todo => {
    //     if (todo._id === serverResponse._id)
    // })
                }
                return serverResponse;
            }
       }
    
    }

async deletePhoto(id){
    let serverResponse = await this.data.delete(this.PHOTO_SERVICE + "/" + id);
    if(!serverResponse.error){
        for(let i = 0; i < this.photoArray.length; i++){
            if(this.photoArray[i]._id === id){
                this.photoArray.splice(i,1);
            }
        }
    }
}   

async uploadFile(files, userId, photoId){
            let formData = new FormData();
          files.forEach((item, index) => {
        formData.append("file" + index, item);
            });
        let serverResponse = await this.data.uploadFiles(formData, this.PHOTO_SERVICE +"/upload/" + userId + "/" + photoId);
        return serverResponse;
    }
    

    
}
