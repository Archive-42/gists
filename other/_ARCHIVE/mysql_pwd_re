# Please confirm that you want to reset the MySQL passwords
CONFIRM="n"
echo -n "Please confirm MySQL password reset. Continue? (y/N): "
read -n 1 CONFIRM_INPUT
if [ -n "$CONFIRM_INPUT" ]; then
	CONFIRM=$CONFIRM_INPUT
fi

echo

# check if we are resetting the MySQL password
if [[ "${CONFIRM}" =~ ^[Yy]$ ]]; then

	# Kill any mysql processes currently running
	echo 'Shutting down any mysql processes...'
	service mysql stop
	killall -vw mysqld
	
	# Start mysql without grant tables
	mysqld_safe --skip-grant-tables >res 2>&1 &
	
	echo 'Resetting password... hold on'
	
	# Sleep for 5 while the new mysql process loads (if get a connection error you might need to increase this.)
	sleep 5
	
	# Creating the password
	DB_ROOT_PASS_LEN=`shuf -i 20-30 -n 1`
	DB_ROOT_PASS=`pwgen -scn $DB_ROOT_PASS_LEN 1`
	DB_ROOT_USER='root'
	
	# Update root user with new password
	mysql mysql -e "UPDATE user SET Password=PASSWORD('$DB_ROOT_PASS') WHERE User='$DB_ROOT_USER';FLUSH PRIVILEGES;"
	
	echo 'Cleaning up...'
	
	# Kill the insecure mysql process
	killall -v mysqld
	
	# Starting mysql again
	service mysql restart
	
	echo
	echo "Password reset has been completed"
	echo 
	echo "MySQL root password: $DB_ROOT_PASS"
	echo 
	echo "Remember to store this password safely!"
else
	echo "Password reset was aborted"
fi

echo