#!/bin/bash

# Load environment variables from src/main/frontend/config.env
source ./src/main/frontend/config.env

# Ensure IP_ADDRESS is set
if [ -z "$IP_ADDRESS" ]; then
  echo "IP_ADDRESS is not set in config.env"
  exit 1
fi

# Set environment variables for React
export REACT_APP_API_URL="http://$IP_ADDRESS:8080"

# Set environment variables for Backend
export SPRING_SERVER_ADDRESS=$IP_ADDRESS
export SPRING_SECURITY_ALLOWED_ORIGINS="http://$IP_ADDRESS:3000"


# Verify that environment variables are set
echo "SPRING_SERVER_ADDRESS=$SPRING_SERVER_ADDRESS"
echo "SPRING_SECURITY_ALLOWED_ORIGINS=$SPRING_SECURITY_ALLOWED_ORIGINS"
echo "REACT_APP_API_URL=$REACT_APP_API_URL"

# Start Backend app
./gradlew bootRun &
BACKEND_PID=$!

# Start React app
cd src/main/frontend
# Ensure React starts with the correct IP address
export HOST=$IP_ADDRESS
npm start &
FRONTEND_PID=$!

# Wait for both processes to complete
wait $BACKEND_PID
wait $FRONTEND_PID
