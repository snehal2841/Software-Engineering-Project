const PRE = ""
const SUF = ""
var room_id1;
var room_id2;
var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
var local_stream;
const recordButton1 = document.querySelector('button#record1');
const recordButton2 = document.querySelector('button#record2');
function createRoom1(){
    console.log("Creating Room");
    let room1 = document.getElementById("room-input1").value;
    if(room1 == " " || room1 == "")   {
        alert("Please enter video ID for cam1");
        return;
    }
    room_id1 = PRE+room1+SUF;
    let peer1 = new Peer(room_id1);
    peer1.on('open', (id1)=>{
        console.log("Video recording with ID: ", id1);
        hideModal1();
        hideRemote1();
        getUserMedia({video: true, audio: true}, (stream)=>{
            local_stream = stream;
            setLocalStream1(local_stream);
        },(err)=>{
            console.log(err);
        });
        notify("Waiting for video to connect.");
    });
    peer1.on('call',(call)=>{
        call.answer(local_stream);
        call.on('stream',(stream)=>{
            setRemoteStream1(stream);
        });
    });
} 

function createRoom2(){
    console.log("Creating Room");
    let room2 = document.getElementById("room-input2").value;
    if(room2 == " " || room2 == "")   {
        alert("Please enter video ID for cam2");
        return;
    }
    room_id2 = PRE+room2+SUF;
    let peer2 = new Peer(room_id2);
    peer2.on('open', (id2)=>{
        console.log("Video recording with ID: ", id2);
        hideModal2();
        hideRemote2();
        getUserMedia({video: true, audio: true}, (stream)=>{
            local_stream = stream;
            setLocalStream2(local_stream);
        },(err)=>{
            console.log(err);
        });
        notify("Waiting for video to connect.");
    });
    peer2.on('call',(call)=>{
        call.answer(local_stream);
        call.on('stream',(stream)=>{
            setRemoteStream2(stream);
        });
    });
}
//====================1=====================================================
function setLocalStream1(stream){
    
    let video = document.getElementById("local-video1");
    video.srcObject = stream;
    video.muted = true;
    video.play();
}
function setRemoteStream1(stream){
   
    let video = document.getElementById("remote-video1");
    video.srcObject = stream;
    video.play();
}

function hideModal1(){
    document.getElementById("entry-modal1").hidden = true;
}

function hideLocal1(){
    document.getElementById("local-video1").hidden = true;
}

function hideRemote1(){
    document.getElementById("remote-video1").hidden = true;
}
//==========================================2====================================
function setLocalStream2(stream){
    
    let video = document.getElementById("local-video2");
    video.srcObject = stream;
    video.muted = true;
    video.play();
}
function setRemoteStream2(stream){
   
    let video = document.getElementById("remote-video2");
    video.srcObject = stream;
    video.play();
}

function hideModal2(){
    document.getElementById("entry-modal2").hidden = true;
}

function hideLocal2(){
    document.getElementById("local-video2").hidden = true;
}

function hideRemote2(){
    document.getElementById("remote-video2").hidden = true;
}


function notify(msg){
    let notification = document.getElementById("notification");
    notification.innerHTML = msg;
    notification.hidden = false;
    setTimeout(()=>{
        notification.hidden = true;
    }, 3000);
}

function joinRoom1(){
    console.log("Tracking Video")
    let room1 = document.getElementById("room-input1").value;
    if(room1 == " " || room1 == "")   {
        alert("Please enter Video ID for cam1");
        return;
    }
    room_id1 = PRE+room1+SUF;
    //hideModal();
    hideLocal1();
    let peer1 = new Peer();
    peer1.on('open', (id1)=>{
        console.log("Connected with Id: "+id1);
        getUserMedia({video: true, audio: true}, (stream)=>{
            local_stream = stream;
            setLocalStream1(local_stream);
            notify("Tracking Video");
            let call = peer1.call(room_id1, stream);
            call.on('stream', (stream)=>{
                setRemoteStream1(stream);
            });
        }, (err)=>{
            console.log(err);
        });
    });
}

function joinRoom2(){
    console.log("Tracking Video")
    let room2 = document.getElementById("room-input2").value;
    if(room2 == " " || room2 == "")   {
        alert("Please enter Video ID for cam2");
        return;
    }
    room_id2 = PRE+room2+SUF;
    hideLocal2();
    let peer2 = new Peer();
    peer2.on('open', (id2)=>{
        console.log("Connected with Id: "+id2);
        getUserMedia({video: true, audio: true}, (stream)=>{
            local_stream = stream;
            setLocalStream2(local_stream);
            notify("Tracking Video");
            let call = peer2.call(room_id2, stream);
            call.on('stream', (stream)=>{
                setRemoteStream2(stream);
            });
        }, (err)=>{
            console.log(err);
        });
    });
}

