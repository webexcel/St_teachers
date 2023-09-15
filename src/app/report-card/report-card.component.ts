import { Component, OnInit } from '@angular/core';
import {TranslateConfigService} from '../service/translate-config.service';
import { Router} from '@angular/router';
import { Platform } from '@ionic/angular';
import {AuthService} from "../service/auth.service";
import {LoadingService} from '../service/loading.service';
import {StorageService} from '../service/storage.service';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-report-card',
  templateUrl: './report-card.component.html',
  styleUrls: ['./report-card.component.scss'],
})
export class ReportCardComponent implements OnInit {
  ios:any=false
  classs: any=[];
  subjects:any=[];
  exams:any=[];
  students:any = [];
  select_datas: any={};
  clid:any='-1'
  g_btn:any = false

  constructor(private platform: Platform, private router: Router,private translate: TranslateConfigService,public loading:LoadingService,public authservice:AuthService,public storage:StorageService) {
    this.platform.backButton.subscribe(() => {
      this.router.navigate(['/dashboard']);
    })
   }

  ngOnInit() {
    this.ios=this.authservice.isiso()
    this.translate.set()
    this.classs = this.storage.getjson('classlist')
    this.getallsubject()
    this.getallexams()
    this.exams = [
      {name:"Unit-I",id:"1"},
      {name:"UNIT II",id:"2"},
      {name:"UNIT III",id:"3"},
      {name:"Mid-I",id:"4"},
      {name:"Mid-II",id:"5"},
      {name:"Mid-III",id:"6"},
      {name:"Preparatory",id:"7"}
    ]
  }

  //this.getStudentsByClass(this.select_datas.class.id)

  classChange(event: any){
   if(this.select_datas.exams && this.select_datas.subject){
    this.g_btn = false
    this.students = []
    this.select_datas.student=[]
    this.checkbtn()
  }
  }

  subjectChange(event: any){
    if(this.select_datas.class && this.select_datas.exams){
      this.g_btn = false
      this.students = []
      this.select_datas.student=[]
      this.checkbtn()
    }
  }

  subjectExam(event: any){
    if(this.select_datas.class && this.select_datas.subject){
      this.g_btn = false
      this.students = []
      this.select_datas.student=[]
      this.checkbtn()
    }
  }

  checkbtn(){
    //this.g_btn = true
    
    let data ={class_Id :this.select_datas.class.id,
    sub  :this.select_datas.subject.name,
		examName : this.select_datas.exams.exam_type_name}
    this.loading.present()
    this.authservice.post('EnableGenerateButton',data).subscribe((res: any)=>{
      this.loading.dismissAll()
      console.log(res)
      if(res['data'].length>0){
        if(Number(res['data'][0]['count'])==0){
          this.g_btn = true
        }else{
          this.g_btn = false
          this.getGenerateMarksList()
        }        
      }else{
        this.g_btn = false
        this.getGenerateMarksList()
      }
    },err=>{
      this.loading.dismissAll()
      console.log(err)
    })
  }

  generate(){
    let data ={class_Id :this.select_datas.class.id,
      sub  :this.select_datas.subject.name,
      examName : this.select_datas.exams.exam_type_name}
      this.loading.present()
      this.authservice.post('generateMarksList',data).subscribe((res: any)=>{
        this.loading.dismissAll()
        console.log(res)
        if(res['status']){
          this.g_btn = false
          this.getGenerateMarksList()
        }
      },err=>{
        this.loading.dismissAll()
        console.log(err)
      })
    //this.g_btn = false
    //this.getStudentsByClass(this.select_datas.class.id)
  }

  getGenerateMarksList(){
    let data ={class_Id :this.select_datas.class.id,
      sub  :this.select_datas.subject.name,
      examName : this.select_datas.exams.exam_type_name}
      this.loading.present()
      this.authservice.post('getGenerateMarksList',data).subscribe((res: any)=>{
        this.loading.dismissAll()
        console.log(res)
        if(res['status']){
            this.students = res['data']
        }else{
          this.g_btn = false
        }
      },err=>{
        this.loading.dismissAll()
        console.log(err)
      })
  }


  getStudentsByClass(class_Id: any){
    console.log(this.select_datas)
    if(this.clid != class_Id){
      let data ={
        class_Id : class_Id
      }
      this.loading.present()
      this.authservice.post('getStudentsByClass',data).subscribe((res: any)=>{
        this.loading.dismissAll()
        if(res['status']){
          this.clid = class_Id
          for (let i = 0; i < res['data'].length; i++) {
            this.students.push(
              {
                class_id:this.select_datas.class.id,
                class_sec:this.select_datas.class.name,
                sub_name:this.select_datas.subject.name,
                sub_id:this.select_datas.subject.id,
                stu_name:res['data'][i]['name'],
                adno:res['data'][i]['id'],
                mark:'',
                maxmark:'',
                grade:''
              }
            )  
          }
          //this.students = res['data']
          console.log(this.students)
        }
      },err=>{
        this.loading.dismissAll()
        console.log(err)
      })
    }
    
  }

  getallsubject(){
    this.loading.present()
    this.authservice.get('getallsubject').subscribe((res: any)=>{
      this.loading.dismissAll()
      if(res['status']){
        this.subjects = res['data']
      }
    },err=>{
      this.loading.dismissAll()
      console.log(err)
    })
  }


  getallexams(){
    this.loading.present()
    this.authservice.get('getallExam').subscribe((res: any)=>{
      this.loading.dismissAll()
      if(res['status']){
        this.exams = res['data']
      }
    },err=>{
      this.loading.dismissAll()
      console.log(err)
    })
  }


  onSubmit(form: NgForm){
    console.log()
    this.loading.present()
      this.authservice.post('UpdateExamMarkList',{mark:this.students}).subscribe((res: any)=>{
        this.loading.dismissAll()
        console.log(res)
        if(res['status']){
          console.log(this.students)
        }
      },err=>{
        this.loading.dismissAll()
        console.log(err)
      })
  }







}
