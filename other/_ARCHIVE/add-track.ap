tell application "iTunes"
  set currentTrack to current track
  
  set userPlaylists to {}
  
  repeat with currentPlaylist in user playlists
    set playlistName to name of currentPlaylist
    if currentPlaylist is not smart then
      if special kind of currentPlaylist is none then
        copy (playlistName as string) to the end of userPlaylists
      end if
    end if
  end repeat
  
  set trackArtist to artist of currentTrack
  set trackName to name of currentTrack
  set trackArtistName to trackArtist & " - " & trackName
  
  set selectedPlaylist to {choose from list userPlaylists with prompt "Which playlist do you want to add " & trackArtistName & " to?"} as string
  
  repeat with currentPlaylist in user playlists
    set playlistName to (name of currentPlaylist as string)
    if playlistName is equal to selectedPlaylist then
      add (get location of currentTrack) to currentPlaylist
      display dialog "Added the selected track to the specified playlist!" buttons {"OK"}
    end if
  end repeat
end tell