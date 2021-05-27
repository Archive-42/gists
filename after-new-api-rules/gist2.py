# # first: mkdir user && cd user && cp /path/to/get_gists.py .
# # python3 get_gists.py user
# import requests
# import sys
# from subprocess import call

# user = sys.argv[1]

# r = requests.get('https://api.github.com/users/{0}/gists'.format(user))

# for i in r.json():
#         folder = i['description'][0:255] if i['description'] else i['id']
#         call(['git', 'clone', i['git_pull_url'], folder])
#         description_file = './{0}/description.txt'.format(folder)
#         with open(description_file, 'w') as f:
#                 f.write('{0}\n'.format(i['description']))



## After new api restrictions:

#!/usr/bin/env python
# Clone or update all a user's gists
# curl -ks https://raw.github.com/gist/5466075/gist-backup.py | USER=fedir python
# USER=fedir python gist-backup.py

import json
import urllib
from subprocess import call
from urllib import urlopen
import os
import math
USER = os.environ['USER']

perpage=30.0
userurl = urlopen('https://api.github.com/users/' + USER)
public_gists = json.load(userurl)
gistcount = public_gists['public_gists']
print "Found gists : " + str(gistcount)
pages = int(math.ceil(float(gistcount)/perpage))
print "Found pages : " + str(pages)

f=open('./contents.txt', 'w+')

for page in range(pages):
    pageNumber = str(page + 1)
    print "Processing page number " + pageNumber
    pageUrl = 'https://api.github.com/users/' + USER  + '/gists?page=' + pageNumber + '&per_page=' + str(int(perpage))
    u = urlopen (pageUrl)
    gists = json.load(u)
    startd = os.getcwd()
    for gist in gists:
        gistd = gist['id']
        gistUrl = 'git://gist.github.com/' + gistd + '.git' 
        if os.path.isdir(gistd):
            os.chdir(gistd)
            call(['git', 'pull', gistUrl])
            os.chdir(startd)
        else:
            call(['git', 'clone', gistUrl])
        if gist['description'] == None:
            description = ''
        else:
            description = gist['description'].encode('utf8').replace("\r",' ').replace("\n",' ')
        print >> f, gist['id'], gistUrl, description