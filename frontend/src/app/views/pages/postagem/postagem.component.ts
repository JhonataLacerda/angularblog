import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/guard/auth.service';
import { Posts } from 'src/models/Posts';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-postagem',
  templateUrl: './postagem.component.html',
  styleUrls: ['./postagem.component.scss']
})
export class PostagemComponent implements OnInit {

  POSTS:any;

  ALLPOSTS:any=[];


  constructor(private auth: AuthService, private router: ActivatedRoute) { }

  data="";
  ngOnInit(): void {
    this.fetchById();
  }

fetchById(){

return  this.auth.singlePage(this.router.snapshot.params['id']).subscribe((res)=>{
      this.ALLPOSTS= res;

      console.log(this.ALLPOSTS);

  })
}


}
