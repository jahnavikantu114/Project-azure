
import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';



@Component({

 selector: 'app-home',

 templateUrl: './home.component.html',

 styleUrls: ['./home.component.css']

})

export class HomeComponent implements AfterViewInit {
role:string='';
login=false;
   constructor(private router: Router){}
 ngAfterViewInit() {
   this.role = localStorage.getItem('token');
   if (this.role) {
      this.login = true;
   }
 }
 subscribe(): void{
   Swal.fire({
      icon: 'success',
      title: 'Subscription Successful',
      text: 'You have been subscribed successfully!'
    })
 }

   navigation():void{
      this.router.navigate([`/login`]);
   }

 featuredDestinations = [

    
  
  
    {
  
     name: 'SANTORINI',
  
     properties: 876,
  
     image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  
    },
  
    {
  
     name: 'MALDIVES',
  
     properties: 542,
  
     image: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  
    },
  
    {
  
     name: 'PARIS',
  
     properties: 1987,
  
     image: 'https://images.unsplash.com/photo-1431274172761-fca41d930114?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  
    }
  
   ];
  
  
  
   testimonials = [
  
    {
  
     text: "The hotels recommended by Hotel Booking Hub exceeded all our expectations. The attention to detail was remarkable.",
  
     name: "Sarah Johnson",
  
     location: "New York, USA",
  
     avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  
    },
  
    {
  
     text: "I've never experienced such excellent service. From booking to checkout, everything was seamless.",
  
     name: "Michael Chen",
  
     location: "Toronto, Canada",
  
     avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  
    },
  
    {
  
     text: "Our stay was perfect thanks to the incredible properties we found through this platform.",
  
     name: "Emma & David",
  
     location: "London, UK",
  
     avatar: "https://randomuser.me/api/portraits/women/68.jpg"
  
    }
  
   ];

}