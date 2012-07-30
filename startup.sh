#!/bin/bash
ruby /srv/dashboard/server/testing.rb &
ruby /srv/dashboard/server/nginxReqSec2.rb &
ruby /srv/dashboard/server/nginxLoadTime.rb &
ruby /srv/dashboard/server/nginxLoadTime2.rb &
ruby /srv/dashboard/server/mysql.rb &
