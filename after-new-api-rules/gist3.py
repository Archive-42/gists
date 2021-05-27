#!/usr/bin/env python
# Clone or update all a user's gists
# curl -ks https://raw.github.com/gist/5466075/gist-backup.py | USER=fedir python
# USER=fedir python gist-backup.py

import json
import urllib
from subprocess import call
import urllib.request

import os
import math
USER = os.environ['USER']

perpage=30.0

public_gists = json.load(userurl)
gistcount = public_gists['public_gists']
print ("Found gists : " + str(gistcount))
pages = int(math.ceil(float(gistcount)/perpage))
print ("Found pages : " + str(pages))
with urllib.request.urlopen('https://api.github.com/users/') as response:
   html = response.read()
f=open('./contents.txt', 'w+')

for page in range(pages):
    pageNumber = str(page + 1)
    print ("Processing page number " + pageNumber)
    pageUrl = 'https://api.github.com/users/' + USER  + '/gists?page=' + pageNumber + '&per_page=' + str(int(perpage))
    u = urllib.request.(https://api.github.com/users/bgoonz/gists?page=10)
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