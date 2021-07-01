const audios = [
    {
      keyCode: 81,
      keyL: 'Q',
      id: 'Q',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
    },
    {
      keyCode: 87,
      keyL: 'W',
      id: 'W',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
    },
    {
      keyCode: 69,
      keyL: 'E',
      id: 'Heater-3E',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
    },
    {
      keyCode: 65,
      keyL: 'A',
      id: 'A',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
    },
    {
      keyCode: 83,
      keyL: 'S',
      id: 'S',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
    },
    {
      keyCode: 68,
      keyL: 'D',      
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
    },
    {
      keyCode: 90,
      keyL: 'Z',
      id: "Z",      
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
    },
    {
      keyCode: 88,
      keyL: 'X',
      id: 'X',      
      url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
    },
    {
      keyCode: 67,
      keyL: 'C',
      id: 'C',      
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
    }
  ];

function App(){
    const [volumen,setvolumen] =React.useState(1);
    const [grabaciones, setGrabaciones] = React.useState("");
    const [velocidad, setVelocidad] = React.useState(0.5);
    const grabacion = () =>{
      let index =0;
      let recordArray = grabaciones.split(" ");
      const interval = setInterval(()=>{
        const audioTag = document.getElementById(recordArray[index]);

        audioTag.volumen = volumen;
        audioTag.currentTime = 0;
        audioTag.play();
        index++;
      },velocidad*600);
      setTimeout(() => clearInterval(interval),600*velocidad*recordArray.length-1);
    };

    return(
        <div id="display" className="min-vh-100 text-dark">
          
            <div className="text-center">
            <h2>Caja De Sonidos</h2>
                {audios.map((clip) =>(
                    <Pad key={clip.id} clip={clip} volumen ={volumen} setGrabaciones={setGrabaciones}/>
                ))}
                <br/>
                <h4>volumenn</h4>
                <input 
                  type="range" 
                  step="0.001" 
                  onChange={(e)=> setvolumen(e.target.value)}
                  value={volumen} 
                  max="1" 
                  min="0" 
                  className="w-50 progress-bar-striped bg-info"
                />
                <div className="mt-5">
                  <h3>{grabaciones}</h3>
                  {grabaciones && (
                    <>
                    <button onClick={grabacion} className="btn btn btn-outline-dark mx-4">Iniciar</button>
                    <button onClick={() => setGrabaciones("")}className="btn btn-outline-secondary mx-4">Limpiar</button>
                    
                  <h4 className="mt-4">Velocidad</h4>
                  <input 
                    type="range" 
                    step="0.001" 
                    onChange={(e)=> setVelocidad(e.target.value)}
                    value={velocidad} 
                    max="1" 
                    min="0" 
                    className="w-50"
                  />
                  </>
                  )}
                </div>
            </div>
        </div>
    );
}

function Pad({clip,volumen,setGrabaciones}){

    const [active, setActive]=React.useState(false);
    
    React.useEffect(() =>{
    /*key press Handler*/
      document.addEventListener('keydown', handleKeyPress);
      return () =>{
        document.removeEventListener('keydown', handleKeyPress);
      }
    }, []);

    const handleKeyPress = (e) =>{
      if(e.keyCode === clip.keyCode){
        playSound();
      }
    };
    const playSound = () =>{
        const audioTag = document.getElementById(clip.keyL);
        setActive(true);
        setTimeout(()=> setActive(false), 200)
        audioTag.volumen = volumen;
        audioTag.currentTime = 0;
        audioTag.play();
        setGrabaciones(prev => prev+clip.keyL + " ");
    };

    return(
        <div onClick={playSound} id="drum-pad" className={`drum-pad btn btn-light p-4 m-3 ${active && "drum-pad btn-warning"}`}>
            <audio className="clip" id={clip.keyL} src={clip.url}/>
            {clip.keyL}
        </div>
    );

}

ReactDOM.render(<App/>,document.getElementById("drum-machine"));