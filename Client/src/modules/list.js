    import {inject} from 'aurelia-framework';
    import {Router} from 'aurelia-router';
    import {MyPics} from '../resources/data/mypics';    
    import { AuthService } from 'aurelia-auth';    
    
    @inject(Router, AuthService, MyPics)
    export class List {

      constructor(router,auht,mypics) {
        this.router = router;
        this.mypics = mypics;
        this.auth = auth;
    
        this.user = JSON.parse(sessionStorage.getItem('user'));
        this.title = "Lina Has Things ToDo!"
        this.priorities = ['Low', 'Medium', 'High', 'Critical'];
        this.showList = true;
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
            priority: this.priorities[1]
        }
        this.showList = false;      
    }

    editMypic(mypic){
                this.mypicObj = mypic;
                this. showList = false;
            }

       deleteMyPic(mypic){
                this.mypics.deleteMypic(mypic._id);
            }

        completeMypic(mypic){
                mypic.completed = !mypic.completed;
                this.mmypicObj = mypic;
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
            this.showList = true;
        }
    }

    back(){
        this.showlist=true;
    }
    
      logout(){
        sessionStorage.removeItem('user');
        this.auth.logout();
      }
    }
    
