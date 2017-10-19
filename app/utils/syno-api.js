/*
Error codes
  100 Unknown error
  101 Invalid parameter
  102 The requested API does not exist
  103 The requested method does not exist
  104 The requested version does not support the functionality
  105 The logged in session does not have permission
  106 Session timeout
  107 Session interrupted by duplicate login
*/

const generateRootQuery = (profile) => {
  let url = profile.url
    if (profile.port && profile.port !== '') {
      url += ':'+profile.port
    } else {
      url += ':5000'
    }
    url += '/webapi'
    return url
}

export function synoLoginQuery(profile) {
  let url = generateRootQuery(profile)
  url += `/auth.cgi?api=SYNO.API.Auth&version=2&method=login&accou
nt=${profile.login}&passwd=${profile.password}&session=DownloadStation&format=cookie`
  return url
}

export function synoDSListQuery(profile) {
  let url = generateRootQuery(profile)
  url += '/DownloadStation/task.cgi?api=SYNO.DownloadStation.Task&version=1&method=list&additional=detail,file,transfer'
  return url
}

export let as = {
  listAlbumsQuery: function(profile) {
    let url = generateRootQuery(profile)
    url += '/AudioStation/album.cgi?api=SYNO.AudioStation.Album&version=3&method=list'
    return url
  },

  listArtistsQuery: function(profile) {
    let url = generateRootQuery(profile)
    url += '/AudioStation/artist.cgi?api=SYNO.AudioStation.Artist&version=4&method=list&additional=albums'
    return url
  },

  listArtistAlbumsQuery: function(profile, artist) {
    let url = generateRootQuery(profile)
    url += '/AudioStation/album.cgi?api=SYNO.AudioStation.Album&version=3&method=list&artist='+encodeURIComponent(artist)
    return url
  },

  listAlbumSongsQuery: function(profile, artist, album, albumArtist) {
    let url = generateRootQuery(profile)
    url += '/AudioStation/song.cgi?api=SYNO.AudioStation.Song'
    + '&version=3'
    + '&method=list'
    + '&additional=song_tag,song_audio,song_rating'
    + '&sort_by=track'
    + '&sort_direction=ASC'
    + '&artist='+encodeURIComponent(artist)
    + '&album='+encodeURIComponent(album)
    + '&album_artist='+encodeURIComponent(albumArtist)
    return url
  },

  webPlayerRequest: function(profile) {
    // /webapi/AudioStation/web_player.cgi
    /* params:
      api	SYNO.AudioStation.WebPlayer
      containers_json	[{"type":"album","sort_by":"track","sort_direction":"ASC","album":"Black Ice","album_artist":"ACDC","artist":"ACDC"}]
      id	__SYNO_WEB_PLAYER__
      library	shared
      limit	0
      method	updateplaylist
      offset	0
      play	true
      version	1
    */
    /* response {"success":true} */
  },

  webPlayerPlaylist: function(profile) {
    // /webapi/AudioStation/web_player.cgi
    /* params: 
      additional	song_tag,song_audio,song_rating
      api	SYNO.AudioStation.WebPlayer
      id	__SYNO_WEB_PLAYER__
      limit	8192
      method	getplaylist
      offset	0
      version	1
    */
    /* response 
      current	0
      mode	normal
      shuffle	0
      songs	[…]
        0	{…}
        additional	{…}
        song_audio	{…}
        song_rating	{…}
        song_tag	{…}
        id	music_1281
        path	/Multimédia/Musique/Louis' Music/iPod/AC_DC/Black Ice/01 - Rock N' Roll Train.mp3
        title	Rock N' Roll Train
        type	file
        1	{…}
        additional	{…}
        song_audio	{…}
        song_rating	{…}
        song_tag	{…}
        id	music_1282
        path	/Multimédia/Musique/Louis' Music/iPod/AC_DC/Black Ice/02 - Skies On Fire.mp3
        title	Skies On Fire
        type	file
      timestamp	1508395716
      total	15
      success	true
    */
  },

  streamSong: function(profile) {
    // This returns audio data, probably ready to play in an audio player
    // /webapi/AudioStation/stream.cgi/0.mp3?sid=Mr.G2hwEUfP9UC5KON10423&api=SYNO.AudioStation.Stream&version=2&method=stream&id=music_1281&_dc=1508395716692&SynoToken=Gr1SpdgQ..wOE
    /* params:
      _dc	1508395716692
      api	SYNO.AudioStation.Stream
      id	music_1281
      method	stream
      sid	Mr.G2hwEUfP9UC5KON10423
      SynoToken	Gr1SpdgQ..wOE
      version	2
    */
  },

  streamSongBis: function(profile) {
    // /webapi/AudioStation/stream.cgi/0.mp3?sid=Mr.G2hwEUfP9UC5KON10423&api=SYNO.AudioStation.Stream&version=2&method=stream&id=music_1282&_dc=1508395716692&SynoToken=Gr1SpdgQ..wOE
    /* params:
      _dc	1508395716692
      api	SYNO.AudioStation.Stream
      id	music_1282
      method	stream
      sid	Mr.G2hwEUfP9UC5KON10423
      SynoToken	Gr1SpdgQ..wOE
      version	2
    */
  }
}