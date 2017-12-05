    import {inject} from 'aurelia-framework';
    import {Router} from 'aurelia-router';
    import {MyPics} from '../resources/data/mypics';   
    import {Photos} from '../resources/data/photos';  
    import { AuthService } from 'aurelia-auth';    
    
    @inject(Router, AuthService, MyPics, Photos)
    export class List {

      constructor(router,auth,mypics, photos) {
        this.router = router;
        this.mypics = mypics;
        this.photos = photos;
        this.auth = auth;
    
        this.user = JSON.parse(sessionStorage.getItem('user'));
        this.title = "My Pictures"
        this.priorities = ['Low', 'Medium', 'High', 'Critical'];
        this.showList = 'mypicList';
        this.showCompleted = false;

      }

      async activate(){
        await this.mypics.getUserMypics(this.user._id);
    }

    createMypic(){   
        this.mypicObj = {
            mypics: "",
            description: "",
            dateDue: new Date(),
            userId: this.user._id,
            priority: this.priorities[0]
        }
        // this.showList = false;      
        this.showList = 'mypicForm'; 
    }

    async showPhoto(mypic){   
       
        await this.photos.getPhoto(mypic._id);
             
        this.showList = 'photosList'; 
    }

    editMypic(mypic){
                this.mypicObj = mypic;
                // this. showList = false;
                this. showList = 'mypicForm';
            }

    deleteMypic(mypic){
                this.mypics.deleteMypic(mypic._id);
            }

        completeMypic(mypic){
                mypic.completed = !mypic.completed;
                this.mypicObj = mypic;
                this.saveMypic();
            }

         toggleShowCompleted(){
                this.showCompleted = !this.showCompleted;
            }
          
        changeFiles(){
                  this.filesToUpload = new Array(); 
                  this.filesToUpload.push(this.files[0]);
                }
        
        removeFile(index){
                    this.filesToUpload.splice(index,1);
                }
                   

    async saveMypic(){
        if(this.mypicObj){       
            let response = await this.mypics.save(this.mypicObj);
            if(response.error){
                alert("There was an error creating the MyPics");
            } else {
                  var mypicId = response._id;
                                if(this.filesToUpload && this.filesToUpload.length){
                                    await this.mypics.uploadFile(this.filesToUpload, this.user._id, mypicId);
                                    this.filesToUpload = [];
                                }                     
            }
            this.showList = 'mypicList';
        }
    }

    back(){
        this.showList='mypicList';
    }
    
      logout(){
        sessionStorage.removeItem('user');
        this.auth.logout();
      }
    }
    
