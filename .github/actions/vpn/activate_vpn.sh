#!/bin/bash -e
ACTIVATION_CODE=${1}
cat > /tmp/activate.script <<EOF2
#!/usr/bin/expect -f
spawn expressvpn activate

expect "Enter activation code: "
send "${ACTIVATION_CODE}\r"

expect "Activating..."
expect "Activated."
EOF2
/usr/bin/expect /tmp/activate.script
/usr/bin/expressvpn status | grep "Not connected"