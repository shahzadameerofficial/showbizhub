import { Component, OnInit } from '@angular/core';
import { TmdbService } from '../../../services/tmdb.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MovieCardComponent } from "../../../components/cards/movie-card/movie-card.component";
import { TvshowCardComponent } from "../../../components/cards/tvshow-card/tvshow-card.component";
import { AgePipe } from '../../../pipes/age.pipe';
import { CelebrityHeroSectionComponent } from "./celebrity-hero-section/celebrity-hero-section.component";
import { CustomTagComponent } from "../../../components/custom-tag/custom-tag.component";
import { CardsContainerComponent } from "../../../components/cards-container/cards-container.component";
import { CustomBedgeComponent } from "../../../components/custom-bedge/custom-bedge.component";
import { TabViewModule } from 'primeng/tabview';
import { Celebrity, ExternalIDs } from '../../../interface/celebrity-details.interface';
import { PageLoaderComponent } from "../../../components/page-loader/page-loader.component";

@Component({
    selector: 'app-celebrity',
    standalone: true,
    templateUrl: './celebrity.component.html',
    styleUrl: './celebrity.component.scss',
    imports: [CommonModule, MovieCardComponent, TvshowCardComponent, RouterModule, AgePipe, CelebrityHeroSectionComponent, CustomTagComponent, CardsContainerComponent, CustomBedgeComponent, TabViewModule, PageLoaderComponent]
})
export class CelebrityComponent implements OnInit{
  
  imageUrl:string = 'http://image.tmdb.org/t/p/original'
  currentId:any;
  currentPerson:any;
  externalIDs:ExternalIDs | undefined;
  expandbiography:boolean = false;
  moviesData:any;
  tvData:any;
  personImages:any;
  coverPhotos: any[]=[]
  allMovies:any;
  socialPlaceholders = {
    youtube:{
      url: '',
      icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACaUlEQVR4nO2ZPWgUURSFD6axSgr/Oi1sLYLiGp17J4UWgqiNC5Ii2Af/0E4RQVTUJilFE6IWglFBbAwm6UQx2Vi6MavFIkTxByKsW6g58p4zZlcRdtc3MzswBw4sy+zb8zFv5r13L5ApU6ZMbS9ux1oKtlCxn4IjFFyhYoSK+xRMUfGCitcULFDx2VpQpYLWvz6H3y8E187a3wruUTFMwWUKDtPHPio2U7CmtbCKHAUXqZigYq4uSPz+ajOYLIIL9LH138F3oYuKWwmGZYO+wRw668MDKygYb4NwbMiCSebRUTttTiYeSpuGOL4MIHiTeCBt2qXlN0zyYdiSt2Ed6KEn8SDaogUe6KMv8SDasg+Z+X/K2YAHN8Z9B84ZgOvOBnw5TU7dIQ+sjwvitgF45GzA4gytqhVy5Cy5c2XUAE/NGjDtHCDU+zJ5vj9KgJIBKEUGEKowSfZvigJg0UyhD5EDGH3/Rj64Su5Z5RQCVHyJBSDU4idy6CjZ2+EIwOV2uRGAUK9myQFxcgd+JAIQ6slDMr8hpQBLS/+9biQ3heYKzqZQzA/xR3cPsaAa72t0bIjc3eXmv9QCvDMA8yleyIoG4HlkAG9L5Jl8FMEZ+Fm6N3OC8bRvp4fTfaBRnE73kdJHX7oP9R560l9WMbLV4qTDaJMWzNvwFsDHicQDadM+9mdx1916EL0n6oq7FiKHTipupmDqjP5VXq8D8SAUDAYNjmLQZGiHBsegLSW2IvZiNXegmx72UjFgOziCa1SMUfGYipmgbVT+3UpSVGqCVGpaTOXg2oKt8wvuBruBS05aTJkyZcqEOPUTXMsL5gsyStgAAAAASUVORK5CYII'
    },
    instagram: {
      url: 'https://www.instagram.com/',
      icon: 'data:image/png;base64,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'
    },
    facebook:{
      url: 'https://www.facebook.com/',
      icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAD00lEQVR4nNWaS2tTURDHr+c0+gl8tCCI4At8rsSF7nxQ8AGCX0AEV+pGdKMutCqIWyXn3KjgY1MVH+ADBa21iqhgfYGosZqZNGmqaavGmLQZObf2QZqk995MmmZgVmnu+f/umTmZmVPL4jIdmylt3CIU7pMKzwiNzULjvf/eLBWG/n+22fytNSlMRxdJBcekgndSI7l2BTmh4a3U0GSeMbGiiaZIHWkUGlo9iS7hQsMjqaMbKq49YMMKofEpl3CZD6LgcSAUWcav/BDVSQ3HpYL+SomXww5ZqeCoWZNHvP21QWhsq7xwzA+rVivYUV+e+FBsrtT4aaLFy5Hd+GLZsMCfeAXzpYZ49cTjEETcOh2Z5028/bXB0FdfPA5BhN2H0yGqM6dB9UVjXk7gUyv4IjCufue0YVx4qo207f4POvfhN71LZul7eoByRJTK5uhHeoAiv/rpZSJDjbe73exEU0nxgeC3Jc4xxiR+5bUu+tCTJTe241HSDUA2oGB5YfVEUzh/pNbd6qY//eZdEyMADh6vhUMn0sglvuFCJ8VTA67FewFw3MZ1YwA4a5vjr36SV9vhAUAoaBlbVTKJD9hIiT+l334sNUAt0b90H9LD7i6JR9wK4sKR8DElMRPAsitdJcWfaP9J00IMayk8MhrAWz1fwre3JIuKf5/MOjvEsY5Q2D6o/lTnDNNgcAHsf9ZbFODgiz6WNaSzA5BzOjvTBrI9VCMdK5HAW+995wPQSDIImyyhcT/nQ0++Lg6w+kaCFUAo2GtKB3uiAFZd5wWQGpQlFFypVQChsdkA3K1dALjjG2Bna9KpJvO9VP3TlxmsQAv5mpsJ3wC+QmjPkx7itNkXY/5CyG8ScwL0ZnJU5zuJfR6jnADPuzJlHKMKN1cb4PzHlM9Eho2+SwlOgAPP+/yVEqHo9KFe4K3XB8y5FHO6rny/HE4VFbqrrafgd2b7SWCFr0ZXo0f9bWFVfwcO5w2xagvAyp/YDY64awNAKHxQoKmPbqgVAKlxbcHJBMdErtIAYkxDP2awhZnJCwDZcS9Ayj2RKrwDhy1Xw90yZkSVAhAmdFzf2gQ76s1Ie9IAKPhsnY3PsibigoMdQEHM+wXH6CsmhR+rBwBh8yKtsizYUe8lJ7gAhIl5z2FT+pq1yc3dAQNAxjlt2K5ZR1lAR5aOtxvlAAgFLQG7c7FVaZMK1wsND7kAhMIHRcuDipoNC8yUWGh8PdQUuQIw/+yhsN0JlbKTlMtC0emmxdv9pDd4OZxqv/Mt/eVxLJ1oi6UTdyPpjqvh1JtV1+ImjzYOd1IM9g8AXeyr2VY3tgAAAABJRU5ErkJggg=='
    },
    tiktok: {
      url: 'https://www.tiktok.com/@',
      icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAACeklEQVR4nO2az4tOURjHP8MgkhVGjQUWrM2CUjJ+/5iyIMnCj2Q3RkpNolGTQtkoKcpfwEYKiZX8mIUxr2xsLJQkC80MoVxzpqfOO8ztnPe9973n9T7n5qlvvbf3ns73c88595znnAt/Yg5wAngBjANGqcasxz7reVosBV4rMGlyqmK9T7VEjBDGagSYje1OJnIdF5AhBUaK6jl28JjINSogiQIjRZX8ByH/U7sI7EvpY4wt0pOevIA7MYLscoAcKQvIPOBDGUAk9gITMYHsxB8DMYHsoHYcA76VAUSiE7gCfNIMsp3s0QYst3lHFCAz6wDd0wiyzWH0RllAfgPnbFeKBmSrB0T+e2jHRMtBfthKLwMngfuOe7bUADH29wPgKLAWWAk8/Vcg8prsBeanDJ5vAKSICoHIynWBw5wPZLNGkOvADA9ENCCPgPYaED6QTZpAfgLLPOYX222Za8CwdpCrHoiDwNc6ZTdqAlnnMLM7Yz6hBuSLY4DL9buM5bu1gFQcRlbnqGyDFpDHDiM9OSpb72jNiVaADDtA1uSobEWqbEcgCJMX5LNjldqecZPtTcGHYEKCiLochg7XKfPLM6ufbSXIJdzRbw27dslluycdbYEPl5K8IDLpLfHArAIuAHeBW8ApYKHn3v0BIUyja63bNTK6LLEIeK8BxACDDULMBZ4EhjBF8xHZOJiVA0JOX182AcKEyBDfAnvq5CaSPZ5p8hFfUhTk75T3ps3XDwCHgNN24H9vIoAJDdJqJaUCGVVgJMjx9JACI0E+GOhTYKSoeqsf1VQUmGlUr6of1VQnq5FIITrTE5dQyXaO9DfNLwDx9sx2p6mWmAQ/4ELABrEc7QAAAABJRU5ErkJggg=='
    },
    imdb:{
      url: 'https://www.imdb.com/name/',
      icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAABc0lEQVR4nGO4t0FB/d5Gpd13NyjepSa+BzJznaIaA4hxb6PSf5rgDUq7GO5uUHpAKwvublB6MGrB/xEWRFsmyPxvyxb9v2ea7P/WLBEwPrtEHs7eCxXvzhf9P7dW4v+NNYr/13RKgcWurFQgbEFRtOB/BgYGsAEgGoS78hDs3gIxMC3Iy/yfmYnhf6Ajz/8kP36w2OHZcuRZ4GvH85+REdWCYCfe/6qybP/V5dngFmQEC/wPc+X9f3qRPPEWCPMz/xfiZ/4vKsiMYQHIcEUpVrgFvrY8cB8TbYGRBgeYNtbkwGqBvCTCgpYsETDdnClCvAUgg0A0KKzRLVCWYUWxoDFdBG4R0RYUxwiB6fwIQRQL+LiZwPFirc8JtwDm22nl4rgt2DpB5n9nLiKZ7p4qC062O6fIoCRTUDhPrxQHJ2FYMl3WKvm/PUf0/+11isM5J98btWDjQATRPRpW+nc3KO1kADUtQLU/1ZstG5R23dmspAoA9upm5a9T5sgAAAAASUVORK5CYII='
    },
    twitterX:{
      url: 'https://twitter.com/',
      icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADf0lEQVR4nN2aWchNURTHf+YhZYoQEjJLeUCZpVCGlAdSKDJEiUzhyRBlehBeRETKA5GkRMb4FA9KZjJ9n5lCpvvZWlqnVse97rn3nPN9+1r1r3vX3vuc9d/D2muvs+FvaQ4sAy4CFUAl4KoZlUA5cAFYCjQjj8wFPnpguMuDD8DsXCS2emCgKxCbs42EK1HMDkg0Bd57YFCx+KDr+s/CdiWOpagncCWO80LklQeGxEW5EPnpgSFx8UOIZDwwJC4yhRAR1qcjoDzG7n1Gn3EW+JUWEcH0fKEB0Bf4XgSRReYZ29McEcEnoHMEMqsKNGS3absw7akV4BJQS186HHhoMF71tQpw66eA2tpubJFrtigigtWmB/cb/RuglerbRYgYbgFNtH7PGAFr0UTEZfdXAxoB90M9XEPLpv3jGUK6k9ZrDTwtkkQsIoIHSkJkYOg5882IHcrS9iswQMsbAGUxSLi4RAS7jMHrQ4b2Vr1MnSemTNzqFC2rCRyNScIlQUQwTo2SBXvV6G8AdbVsiDlprkjhDJRJgshrs8A7qYsOyjYao7cAe8z/mQmRcEkREZwwC3yO0csoDFN9PaCO/h6VcIyXSYqIYJ7p7WNG/yyULOihhyHnK5EvQFc1tgXw0pSJ5wpkQcIkXNJEBNfNAh8VCvymql6m4EnfiThgnen9HUYvu3YH1bcB3vpOpBIYqgbXB27miNMm+k7EAdv+EdavNGV7fSZyQV2tleWmXNxuvxxxmvOFyL0gxwR0ByaYUOScqXcHaJgjTnPVTeQd0EWNa649LftFe9W11TrZ4rS1vhD5AYwwC/xyKOckIyIyKWKc5qqDyC89dwR7xIEsdRab3j8YMU5zVU1kTYQp8g3oo3UaA49zHMTmVheRw8aIyXlSOLf0ECUyKPReG6cdr2oi14znGay9nq+NnD8C2RA6iPUycVpFVRF5BLTUF3fUuR6lnYzYGLPAy3IcxEannaBzmhnpbtzsvQLbPzd7TTfgrkknzTcjtjNNIuJmR+qL6mhqs5hpeYT80hC4nRYR8SroAt9XJIkAMxJMv2YKIfLZJKqvxCThdM+IkhR/l8aI+IrMf/Whp8IDQ+Lixf/yMfQc+mnXlTiWBBcGongG7y8MoNcgXIliFiHZ7IFRrkBsIofMSSGdmQbeZxuJsMh8k8UjR1T51OzTxTPxTmLbXxfPfgPQ44OgiWG49wAAAABJRU5ErkJggg=='
    }
  }
  isLoading:boolean = true
  
  genders:string[]=['Not set / not specified','Female','Male','Non-binary'];
  constructor(private tmdbService:TmdbService, private ac:ActivatedRoute){
    window.scrollTo(0,0)
  }
  ngOnInit(): void {
    this.getId()
    this.getDetails()
    this.getCredits()
    this.getSocialIds();
  }

  celebrityId:number | undefined;
  currentCelebrity:Celebrity | undefined

  getId(){
    this.ac.params.subscribe((res:any)=>{
      if (res.id) {
        this.currentId = res.id;
        this.celebrityId = res.id
      }
    }).unsubscribe()
  }
  getDetails(){
    this.isLoading = true
    this.tmdbService.getTMDBData(`person/${this.celebrityId}`).subscribe((res:any)=>{
      console.log(res);
      this.currentPerson = res;
      this.currentCelebrity = res;
      document.title = res.name;
      this.isLoading = false
    },()=>{
      this.isLoading = false
    })
  }
  celebrityCredits:any;
  recentProject:any;
  getCredits(){
    this.tmdbService.getTMDBData(`person/${this.currentId}/combined_credits`).subscribe(
      (res:any)=>{
        // console.log(res);
        let cast = res.cast.sort((a:any,b:any)=>{
          let x = parseInt(a?.release_date?.slice(0,4) || a?.first_air_date?.slice(0,4))
          let y = parseInt(b?.release_date?.slice(0,4) || b?.first_air_date?.slice(0,4))
          return y-x
        })
        let crew = res.crew.sort((a:any,b:any)=>{
          let x = parseInt(a?.release_date?.slice(0,4) || a?.first_air_date?.slice(0,4))
          let y = parseInt(b?.release_date?.slice(0,4) || b?.first_air_date?.slice(0,4))
          return y-x
        })
        this.celebrityCredits = {cast, crew}
        this.recentProject = cast
      }
    )
  }
  getImages(){
    this.tmdbService.getTMDBData(`person/${this.currentId}/images`).subscribe((res:any)=>{
      this.personImages = res.profiles;
    })
  }
  getSocialIds(){
    this.tmdbService.getTMDBData(`person/${this.currentId}/external_ids`).subscribe((res:any)=>{
      this.externalIDs = res;
      console.log(res);
      
    })
  }

}
