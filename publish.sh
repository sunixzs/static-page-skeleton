#!/bin/bash

# Add --delete right before "output_prod" to have rsync remove files that are
# deleted locally from the destination too. See README.md for an example.
rsync -avze 'ssh -p 22' --delete staging/ benkler.com:showroom.benkler.com/stephan-roehl.de/
if [ $? -ne 0 ]; then echo "Could not publish the site"; exit 1; fi
