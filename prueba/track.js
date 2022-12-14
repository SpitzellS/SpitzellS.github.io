function addTrack(name, duration) {
    var videoTrack = document.getElementById("video"), track
    
    if (isNaN(duration)) {
        errorTrack = true
    } else {
        errorTrack = false
        cue = new VTTCue(0, duration, name)
        if(!videoTrack.textTracks[0]) {
            track = videoTrack.addTextTrack("captions", "English", "en")
        } else {
            track = videoTrack.textTracks[0]
        }
        track.addCue(cue)
    }
}

function removeTrack() {
    var videoTrack = document.getElementById("video"), track
    if(videoTrack.textTracks && !errorTrack){
        var videoTrack = document.getElementById("video"), track
        track = videoTrack.textTracks[0]
        track.removeCue(cue)
    }
}
