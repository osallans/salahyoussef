function openNav() {
    if(document.getElementById("mySidenav").style.width!="60px"){
      document.getElementById("mySidenav").style.width = "60px";
      document.getElementById("main").style.marginLeft = "60px";
      document.getElementById("footer").style.marginLeft = "60px";
    }else{
      document.getElementById("mySidenav").style.width = "0";
      document.getElementById("main").style.marginLeft = "0";
      document.getElementById("footer").style.marginLeft = "0";
    }
  }



    