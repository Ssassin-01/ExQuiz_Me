#!/bin/bash

# Function to detect the local IP address on macOS
get_ip_macos() {
  IP_ADDRESS=$(ifconfig | grep "inet " | grep -v 127.0.0.1 | awk '{ print $2 }' | head -n 1)
  echo $IP_ADDRESS
}

# Function to detect the local IP address on Windows using PowerShell
get_ip_windows() {
  IP_ADDRESS=$(powershell.exe -Command "Get-NetIPAddress -AddressFamily IPv4 | Where-Object { \$_.InterfaceAlias -like 'Ethernet*' -or \$_.InterfaceAlias -like 'Wi-Fi*' } | Select-Object -ExpandProperty IPAddress | Out-String -Width 200 | Write-Host")
  echo $IP_ADDRESS | tr -d '[:space:]'
}

# Determine the OS and get the IP address accordingly
if [[ "$OSTYPE" == "darwin"* ]]; then
  IP_ADDRESS=$(get_ip_macos)
elif [[ "$OSTYPE" == "msys" || "$OSTYPE" == "cygwin" ]]; then
  IP_ADDRESS=$(get_ip_windows)
else
  echo "Unsupported OS"
  exit 1
fi

# Ensure IP_ADDRESS is set
if [ -z "$IP_ADDRESS" ]; then
  echo "Unable to detect IP_ADDRESS"
  exit 1
fi

# Set environment variables for React and Backend
export REACT_APP_API_URL="http://$IP_ADDRESS:8080"
export REACT_APP_SPRING_SECURITY_ALLOWED_ORIGINS="http://$IP_ADDRESS:3000"

export SPRING_SERVER_ADDRESS=$IP_ADDRESS
export SPRING_SECURITY_ALLOWED_ORIGINS="http://$IP_ADDRESS:3000"

# Verify that environment variables are set
echo "SPRING_SERVER_ADDRESS=$SPRING_SERVER_ADDRESS"
echo "SPRING_SECURITY_ALLOWED_ORIGINS=$SPRING_SECURITY_ALLOWED_ORIGINS"
echo "REACT_APP_API_URL=$REACT_APP_API_URL"
echo "REACT_APP_SPRING_SECURITY_ALLOWED_ORIGINS=$REACT_APP_SPRING_SECURITY_ALLOWED_ORIGINS"

# Start Backend app
./gradlew bootRun &
BACKEND_PID=$!

# Start React app
cd src/main/frontend
# Ensure React starts with the correct IP address
export HOST=$IP_ADDRESS
npm start &
FRONTEND_PID=$!


# Handle script termination (Ctrl + C) to kill both processes
trap "echo 'Terminating...'; kill $BACKEND_PID $FRONTEND_PID; exit 0" SIGINT


# Wait for both processes to complete
wait $BACKEND_PID
wait $FRONTEND_PID
