#!/bin/bash

source $(dirname "$0")/lib/helpers.sh

# declare an array of urls
urls=(
  https://raw.githubusercontent.com/r-a-y/mobile-hosts/master/AdguardDNS.txt
  https://github.com/bigdargon/hostsVN/raw/master/hosts
  https://abpvn.com/android/abpvn.txt
  https://adaway.org/hosts.txt
  https://raw.githubusercontent.com/mullvad/dns-blocklists/main/output/doh/doh_adblock.txt
  https://raw.githubusercontent.com/mullvad/dns-blocklists/main/output/doh/doh_gambling.txt
  https://raw.githubusercontent.com/mullvad/dns-blocklists/main/output/doh/doh_privacy.txt
  https://raw.githubusercontent.com/FadeMind/hosts.extras/master/add.Risk/hosts
  https://raw.githubusercontent.com/StevenBlack/hosts/master/hosts
  https://raw.githubusercontent.com/bigdargon/hostsVN/master/option/domain.txt
  https://adguardteam.github.io/AdGuardSDNSFilter/Filters/filter.txt
)

# download all files in parallel and append them to input.csv
download_lists $urls 'input.csv'

# print a message when done
echo "Done. The input.csv file contains merged data from recommended filter lists."
