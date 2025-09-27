#!/bin/bash

set -e

log() {
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1"
}

# Handle Ctrl+C
confirm_exit() {
  echo ""
  read -p "Are you sure you want to exit? [y/N] " answer
  case "$answer" in
    [Yy]* )
      echo "Exiting."
      exit 1
      ;;
    * )
      echo "Resuming..."
      ;;
  esac
}
trap confirm_exit SIGINT

run_step() {
  CMD=$1
  DESC=$2

  log "Starting: $DESC"
  if ! eval "$CMD"; then
    log "Error during: $DESC"
    return 1
  fi
  log "Completed: $DESC"
  return 0
}

# Step 1: Check formatting
if ! run_step "npm run format:check" "Checking code formatting"; then
  log "Code is not formatted. Running auto-format..."
  run_step "npm run format" "Auto-formatting code"
fi

# Step 2: Build project
run_step "npm run build" "Building project"

# Step 3: Lint project
run_step "npm run lint" "Linting files"

log "All tasks completed successfully."
