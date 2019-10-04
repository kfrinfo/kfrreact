import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import drawAppHeader from './canvas';
import profilePicture from './photoKFR2018.jpg'; // Tell Webpack this JS file uses this image

class AppHeader extends Component {

  constructor(props) {
    super(props);
    // Crée une référence pour stocker l’élément DOM appHeader
    this.appHeader = React.createRef();
    this.state = this.getDimensions();
    // this.drawAppHeader = drawAppHeader.bind(this, this.state);
  }

  componentDidMount() {
    window.addEventListener('resize', this.getDimensions);
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.getDimensions);
    window.removeEventListener('scroll', this.handleScroll);
  }

  //Return actual dimensions for canvas to draw matrix effect
  getDimensions() {
    const w = window;
    const d = document;
    const documentElement = d.documentElement;
    const body = d.getElementsByTagName('body')[0];
    const width = w.innerWidth || documentElement.clientWidth || body.clientWidth;
    const height = w.innerHeight || documentElement.clientHeight || body.clientHeight;

    return { width, height };
  }

  // updateDimensions = () => {
  //   this.setState(this.getDimensions());
  // };

  handleScroll = () => {
    var header = document.getElementById("myHeader");
    var sticky = 210;

    if (window.pageYOffset > sticky) {
      header.classList.add("sticky");
    } else {
      header.classList.remove("sticky");
    }
  };

  drawAppHeader = (state) => {
    const w = window;
    const d = document;
    const documentElement = d.documentElement;
    const body = d.getElementsByTagName('body')[0];
    const width = w.innerWidth || documentElement.clientWidth || body.clientWidth;
    console.log("state : ", width)
    var canvas = document.body.childNodes[1].childNodes[0].childNodes[0].appendChild( document.createElement( 'canvas' ) ),
        context = canvas.getContext( '2d' );
    context.globalCompositeOperation = 'lighter';
    canvas.width = width - 50;
    canvas.height = 150;

    draw();

    var textStrip = ['0', '1', '0', '1'];
    var stripCount = 60, stripX = [], stripY = [], dY = [], stripFontSize = [];
    for (var i = 0; i < stripCount; i++) {
        stripX[i] = Math.floor(Math.random()*1265);
        stripY[i] = -100;
        dY[i] = Math.floor(Math.random()*7)+3;
        stripFontSize[i] = Math.floor(Math.random()*16)+8;
    }

    var theColors = ['#cefbe4', '#81ec72', '#5cd646', '#54d13c', '#4ccc32', '#43c728'];

    function drawStrip(x, y) {
        for (var k = 0; k <= 20; k++) {
            var randChar = textStrip[Math.floor(Math.random()*textStrip.length)];
            if (context.fillText) {
                switch (k) {
                case 0:
                    context.fillStyle = theColors[0]; break;
                case 1:
                    context.fillStyle = theColors[1]; break;
                case 3:
                    context.fillStyle = theColors[2]; break;
                case 7:
                    context.fillStyle = theColors[3]; break;
                case 13:
                    context.fillStyle = theColors[4]; break;
                case 17:
                    context.fillStyle = theColors[5]; break;
                default:
                    context.fillStyle = theColors[5];
                }
                context.fillText(randChar, x, y);
            }
            y -= stripFontSize[k];
        }
    }

    function draw() {

        // clear the canvas and set the properties
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.shadowOffsetX = context.shadowOffsetY = 0;
        context.shadowBlur = 8;
        context.shadowColor = '#94f475';
        
        for (var j = 0; j < stripCount; j++) {
            context.font = stripFontSize[j]+'px MatrixCode';
            context.textBaseline = 'top';
            context.textAlign = 'center';
            
            if (stripY[j] > 1358) {
                stripX[j] = Math.floor(Math.random()*canvas.width);
                stripY[j] = -100;
                dY[j] = Math.floor(Math.random()*7)+3;
                stripFontSize[j] = Math.floor(Math.random()*16)+8;
                drawStrip(stripX[j], stripY[j]);
            } else drawStrip(stripX[j], stripY[j]);
            
            stripY[j] += dY[j];
        }
      setTimeout(draw, 70);
    }
  }

 
  render() {
    return (
      <div className="App-header" ref={this.appHeader}  onLoad={this.drawAppHeader}>
        <div className="Container">
          <img src={logo} className="App-logo" alt="logo"/>
          <svg>
            <rect></rect>
          </svg>
        </div>
      </div>
    );
  }
}

class App extends Component {
    
  render() {
    return (
      <div className="App">
        <AppHeader/>
        <div className="header" id="myHeader">
          <a href="#contact">Contact</a>
          <a href="#resume">Resume</a>
          <a href="#about">About</a>
        </div>
        <div className="content">
          <div className="about" id="about">
            <h3 style={{textAlign: "left", marginTop: 20, color: "white"}}>Parcours</h3>
            <h4 style={{textAlign: "left", color: "white",  display: "inline-block", width: "70%"}}>Développeur Web Front-end 🎨</h4>
            <div style={{textAlign: "left", color: "white", display: "inline-block", width: "70%"}}>
              <p>Diplômé de la MIAGE avec un parcours informatique technique, je travaille aujourd'hui en tant que Freelance spécialisé sur les aspects front-end de vos solutions web.
              <br/>J'ai plus de 7 ans d'expérience et à mon actif une dizaine de missions pour le compte de grandes et petites structures dans les domaines de l'aéronautique, l'énergie, les télécoms ou encore l'administration française.
              <br/>Que ce soit pour de longs projets à temps plein ou pour une aide ponctuelle, je reste disponible et à l'écoute de vos demandes. 💻📱</p>
            </div>
          </div>
          <div className="resume" id="resume">
            <h3 style={{textAlign: "left", marginTop: 20, color: "white"}}>Réalisations</h3>
            <div style={{textAlign: "left", color: "white", display: "inline-block", width: "70%"}}>
              <h4>Aéronautique</h4>
              <h5>Consultant technique developpement Web</h5>
              Mission(s) et réalisations :
              <ul>
                <li>Mise en place d’applications de Dashboard</li>
                <li>Développement des différentes fonctionnalités</li>
                <li>Corrections de bugs et recette dans une seconde phase de projet</li>
                <li>Suivi de projet en agile</li>
                <li>Amélioration de la performance et sécurité projet</li>
                <li>Equipe internationale : anglais obligatoire</li>
              </ul>
              Environnement technique : Framework propriétaire JS, Javascript, Git, Slack, HMTL, CSS, Jira
            </div>
            <div style={{textAlign: "left", color: "white",  marginTop: 20, display: "inline-block", width: "70%"}}>
              <h4>Administration</h4>
              <h5>Ingénieur Etudes et Développement</h5>
              Mission(s) et réalisations :
              <ul>
                <li>Développer les nouvelles fonctionnalités et les correctifs nécessaires</li>
                <li>Mettre en place les environnements de tests</li>
                <li>Analyser, chiffrer et planifier les taches</li>
                <li>Former les nouveaux arrivants sur les aspects techniques</li>
                <li>Echanger avec le client (compétence bilingue)</li>
              </ul>
              Environnement technique : Eclipse, Java JEE, Junit, SVN, Selenium, Cobol
            </div>
            <div style={{textAlign: "left", color: "white",  marginTop: 20, display: "inline-block", width: "70%"}}> 
              <h4>Education nationale</h4>
              <h5>Consultant Web</h5>
              Mission(s) et réalisations :
              <ul>
                <li>Migrer l’application vers un socle technique plus récent</li>
                <li>Développement de modules ENT avec AngularJS</li>
                <li>Mettre en place les nouvelles fonctionnalités</li>
                <li>Faire des POC sur l'utilisation du core et du framework angular</li>
                <li>Mettre un environnement de tests en place</li>
              </ul>
              Environnement technique : Javascript, AngularJS, JAVA J2EE, intellijIdea, GIT, Méthodes agiles
            </div>
            <div style={{textAlign: "left", color: "white", marginTop: 20, display: "inline-block", width: "70%"}}>
              <h4>Conferencing</h4>
              <h5>Consultant mobile</h5>
              Mission(s) et réalisations :
              <ul>
                <li>Migrer l'application mobile vers le dernier SDK avec un refactoring de toute l’application</li>
                <li>Mettre en place les nouvelles fonctionnalités</li>
                <li>Corrections de bugs</li>
                <li>Suivi de projet en agile</li>
                <li>Amélioration de la performance de l'application</li>
                <li>Contexte de travail international</li>
              </ul>
              Environnement technique : Objective-C, Xcode, MacOS, SVN, Méthodes agiles
            </div>
            <div style={{textAlign: "left", color: "white", marginTop: 20, display: "inline-block", width: "70%"}}>
              <h4>Solutions mobiles</h4>
              <h5>Consultant mobile et web</h5>
              Mission(s) et réalisations :
              <ul>
                <li>Développement de nouvelles fonctionnalités</li>
                <li>Passage à iOS 7 puis iOS8, intégration graphique</li>
                <li>Corrections de bugs</li>
                <li>Evolutions applications Web, Web mobile, iphone et android</li>
                <li>Etre polyvalent (iOS, Web, Web mobile, Android)</li>
                <li>Travailler en Agile (DSM, Sprints, poker planning, Agile tour)</li>
              </ul>
              Environnement technique : J2EE, objective-C, Spring, Eclipse, Xcode, Android Studio, MacOS, Jenkins, SVN
            </div>
            <div style={{textAlign: "left", color: "white", marginTop: 20, display: "inline-block", width: "70%"}}>
              <h4>Telecom</h4>
              <h5>Ingénieur Etude et developpement</h5>
              Mission(s) et réalisations :
              <ul>
                <li>Evolution technique application de gestion</li>
                <li>Passage à iOS 7 puis iOS8, intégration graphique</li>
                <li>Corrections de bugs  et developpement d'évolutions</li>
                <li>Mise en place d’un portail d’entreprise</li>
                <li>Développement les portlets</li>
                <li>Administration du CMS</li>
              </ul>
              Environnement technique : J2EE, prototypage, Liferay, Hibernate / Unix
            </div>
          </div>
          <div className="contact" id="contact">
            <h3 style={{textAlign: "left", marginTop: 20, color: "white"}}>Contact</h3>
              <div style={{textAlign: "left", color: "white", display: "inline-block", width: "70%"}}>
               N'hésitez pas à me transmettre vos demandes par mail : kfr.info@gmail.com 
               <a href="mailto:kfr.info@gmail.com" style={{marginTop: 20, fontSize: 20, float: "left"}}> Contactez-moi </a>
              </div>
          </div>
        </div>
        <div>
          <p style={{textAlign: "left", color: "white", display: "inline-block", width: "30%"}}><img src={profilePicture} className="App-profilePicture" alt="profilePicture" /></p>
        </div>
        <div>
        </div>
      </div>
    );
  }
}

export default App;
