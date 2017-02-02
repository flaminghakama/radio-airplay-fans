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
        fanLinks,
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
    }
    if ( image.alt !== 'Green_thumb_10x13' ) { 
        console.log("Fan image wasn't green thumb.") ; 
    } 

    fanLinks = fanInfoDiv.getElementsByTagName('A') ; 
    if ( fanLinks.length > 0 ) { 
        fanLink = fanInfoDiv.getElementsByTagName('A')[0] ; 
        if ( fanLink.className !== 'fb_exit_link' ) { 
            fanInfo.url = 'no fb link' ; 
        } 
        fanInfo.url = fanLink.href ; 
    } else { 
        fanInfo.url = 'no fb link' ;  
    }

    if ( fanLink.innerHTML !== undefined ) { 
        fanTexts = fanLink.innerHTML.split('</span>') ; 
        if ( fanTexts.length < 2 ) { 
            fanInfo.name = fanLink.innerHTML ; 
        } else {
            fanInfo.name = fanTexts[1] ; 
        } 
    } else {
        fanInfo.name = 'no fan link' ; 
    }

    heard = fanInfoDiv.innerHTML.split('Heard')[1] ; 
    song = heard.split('">"')[1].split('"')[0] ; 
    if ( heard.match(' playing in a station with ') ) { 
        playing = heard.split(' playing in a station with ')[1] ; 
    } else {
        playing = heard.split(' playing in ')[1] ; 
    }
    station = playing.split('<br>')[0].trim().replace('&amp;', '&') ; 
    date = fanInfoDiv.getElementsByClassName('time_ago')[0].title ; 
    fanInfo.heard.push( makeHeardInfo( song, station, date ) ); 
    fanInfo.location = playing.split('<span')[1].split('>')[1].split('>')[0].split('<')[0].trim() ; 

    return fanInfo ; 
}

var showFanTitles = function(fan) { 
    console.log([
        'Fan  Name',
        'Location',
        'URL',   
        'Song Heard', 
        'Station', 
        'Date'
        ].join("\t")) ; 
 }

var showFanInfo = function(fan) { 
    console.log([
        fan.name,
        fan.location,
        fan.url,   
        fan.heard[0].song, 
        fan.heard[0].station, 
        fan.heard[0].date
        ].join("\t")) ; 
 }


var fans = document.querySelectorAll('.feed_item_wrapper.fan_item .floater') ; 

showFanTitles() ; 
for (var i = fans.length - 1; i >= 0; i--) {
    fan = fans[i] ; 
    fanInfo = getFanInfo(fan) ;
    if ( fanInfo !== undefined ) { 
        showFanInfo(fanInfo) ; 
    } else {
        console.log("Didn't get info for fan " + i) ; 
    } 
};
