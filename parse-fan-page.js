var makeHeardInfo = function( song, station, date ) { 
    return {
        song: song,
        station: station, 
        date: date
    }
}

var getFanInfo = function(fan) { 

    var fanInfoDiv,
        image,
        fanLink,
        fanTexts, 
        heard, 
        song, 
        playing, 
        station, 
        date,
        fanInfo = {
            url: '', 
            location: '',
            name: '',
            heard: []
        } ;

    if ( fan.children.length < 3 ) { 
        console.log("Fan didn't have three sections.") ; 
        return ; 
    }

    fanInfoDiv = fan.children[2] ; 
    image = fanInfoDiv.getElementsByTagName('IMG')[0] ;
    if ( image === undefined ) { 
        console.log("Fan didn't have image") ; 
        return ; 
    }
    if ( image.alt !== 'Green_thumb_10x13' ) { 
        console.log("Fan image wasn't green thumb.") ; 
        return ; 
    } 

    fanLink = fanInfoDiv.getElementsByTagName('A')[0] ; 
    if ( fanLink.className !== 'fb_exit_link' ) { 
        console.log('link was not fb link') ; 
        return ; 
    } 
    fanInfo.url = fanLink.href ; 

    fanTexts = fanLink.innerHTML.split('</span>') ; 
    if ( fanTexts.length < 2 ) { 
        console.log("Fan didn't have enough spans.") ; 
        return ; 
    } 
    fanInfo.name = fanTexts[1] ; 

    heard = fanInfoDiv.innerHTML.split('Heard')[1] ; 
    song = heard.split('">"')[1].split('"')[0] ; 
    playing = heard.split(' playing in a station with ')[1] ; 
    station = playing.split('<br>')[0].trim().replace('&amp;', '&') ; 
    date = fanInfoDiv.getElementsByClassName('time_ago')[0].title ; 
    fanInfo.heard.push( makeHeardInfo( song, station, date ) ); 

    fanInfo.location = playing.split('<span')[1].split('>')[1].split('>')[0].split('<')[0].trim() ; 

    return fanInfo ; 
}

var showFanInfo = function(fan) { 
    console.log(fan.name + 
        ' in ' + fan.location +
        ' at ' + fan.url +   
        ' heard ' + fan.heard[0].song + 
        ' in the ' + fan.heard[0].station + 
        ' station on ' + fan.heard[0].date) ; 
 }

var fans = document.querySelectorAll('.feed_item_wrapper.fan_item .floater') ; 

for (var i = fans.length - 1; i >= 0; i--) {
    fan = fans[i] ; 
    fanInfo = getFanInfo(fan) ;
    showFanInfo(fanInfo) ;  
};
