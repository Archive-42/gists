set month_list to {"01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"}
set current_date to current date
set current_month to 1 * (month of current_date)
set current_year to (year of (current date))
set playlist_name to "" & current_year & "-" & (item current_month of month_list)

tell application "iTunes"	
  try
    set pl_monthly to playlist playlist_name
  on error
    set pl_monthly to make new playlist with properties {name:playlist_name}
  end try
  set current_track to current track	
  add (get location of current_track) to pl_monthly
end tell