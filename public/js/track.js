const PRE = ""
const SUF = ""
var room_id;
var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
var local_stream;
const recordButton = document.querySelector('button#record');
function createRoom(){
    console.log("Creating Room");
    let room = document.getElementById("room-input").value;
    if(room == " " || room == "")   {
        alert("Please enter video ID");
        return;
    }
    room_id = PRE+room+SUF;
    let peer = new Peer(room_id);
    peer.on('open', (id)=>{
        console.log("Video recording with ID: ", id);
        hideModal();
        hideRemote();
        getUserMedia({video: true, audio: true}, (stream)=>{
            local_stream = stream;
            setLocalStream(local_stream);
        },(err)=>{
            console.log(err);
        });
        notify("Waiting for video to connect.");
    });
    peer.on('call',(call)=>{
        call.answer(local_stream);
        call.on('stream',(stream)=>{
            setRemoteStream(stream);
        });
    });
} 

function setLocalStream(stream){
    
    let video = document.getElementById("local-video");
    video.srcObject = stream;
    video.muted = true;
    video.play();
}
function setRemoteStream(stream){
   
    let video = document.getElementById("remote-video");
    video.srcObject = stream;
    video.play();
}

function hideModal(){
    document.getElementById("entry-modal").hidden = true;
}

function hideLocal(){
    document.getElementById("local-video").hidden = true;
}

function hideRemote(){
    document.getElementById("remote-video").hidden = true;
}

function notify(msg){
    let notification = document.getElementById("notification");
    notification.innerHTML = msg;
    notification.hidden = false;
    setTimeout(()=>{
        notification.hidden = true;
    }, 3000);
}

function joinRoom(){
    console.log("Tracking Video")
    let room = document.getElementById("room-input").value;
    if(room == " " || room == "")   {
        alert("Please enter Video ID");
        return;
    }
    room_id = PRE+room+SUF;
    hideModal();
    hideLocal();
    let peer = new Peer();
    peer.on('open', (id)=>{
        console.log("Connected with Id: "+id);
        getUserMedia({video: true, audio: false}, (stream)=>{
            local_stream = stream;
            setLocalStream(local_stream);
            notify("Tracking Video");
            let call = peer.call(room_id, stream);
            call.on('stream', (stream)=>{
                setRemoteStream(stream);
            });
        }, (err)=>{
            console.log(err);
        });
    });
}

