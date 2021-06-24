--
-- RemoveDuplicates - remove duplicate tracks in an iTunes playlist
-- Anders Bergh <anders1@gmail.com>, May 2012
-- Public Domain
--

tell application "iTunes"
  set fi to fixed indexing
  set fixed indexing to true
  
  -- list of records with the following structure:
  -- {
  --   trackObj = iTunes track object
  --   trackID = database ID of track
  --   trackCount = occurrences in playlist
  -- }
  set trackCounts to {}
  set myPlaylist to view of front window
  
  -- count duplicates in playlist
  repeat with n from 1 to count tracks of myPlaylist
    set currentTrack to track n of myPlaylist
    set trackID to database ID of currentTrack
    set found to false
    
    -- look for record in list
    repeat with i from 1 to length of trackCounts
      set o to item i of trackCounts
      
      -- is it the correct track record?
      if trackID of o is equal to trackID then
        set found to true
        set trackCount of o to (trackCount of o) + 1
        exit repeat
      end if
    end repeat
    
    -- it hasn't been seen yet, add it to the list with an initial count
    if not found then
      set o to {trackObj:currentTrack, trackID:trackID, trackCount:1}
      copy o to the end of trackCounts
    end if
  end repeat
  
  -- infinite loop to delete duplicates
  repeat
    repeat with n from 1 to length of trackCounts
      set trackInfo to item n of trackCounts
      set trackCount to trackInfo's trackCount
      set trackObj to trackInfo's trackObj
      
      -- only deal with duplicates
      if trackCount > 1 then
        set sArtist to trackObj's artist
        set sName to trackObj's name
        set s to sArtist & " - " & sName
        log s & "; " & trackCount & " track(s), " & (trackCount - 1) & " track(s) left to delete)"
        
        repeat with i from 1 to count tracks of myPlaylist
          set theTrack to track i of myPlaylist
          if theTrack's database ID is equal to trackInfo's trackID and theTrack is not trackObj then
            set trackInfo's trackCount to trackCount - 1
            delete track i of myPlaylist
            exit repeat
          end if
        end repeat
      end if
    end repeat
    
    -- are there any records left with a trackCount > 1?
    set duplicates to false
    repeat with n from 1 to length of trackCounts
      set trackInfo to item n of trackCounts
      if trackCount of trackInfo > 1 then
        set duplicates to true
      end if
    end repeat
    
    -- exit loop if we're finished
    if not duplicates then
      exit repeat
    end if
  end repeat
  
  set fixed indexing to fi
end tell