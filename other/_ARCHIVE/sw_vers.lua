#!/usr/bin/env luajit
-- Original source code at:
-- http://www.opensource.apple.com/source/DarwinTools/DarwinTools-1/sw_vers.c

local ffi = require 'ffi'
local CF = require 'CoreFoundation'

ffi.cdef[[
CFDictionaryRef _CFCopyServerVersionDictionary(void);
CFDictionaryRef _CFCopySystemVersionDictionary(void);

const CFStringRef _kCFSystemVersionProductNameKey;
const CFStringRef _kCFSystemVersionProductVersionKey;
const CFStringRef _kCFSystemVersionBuildVersionKey;
]]

local dict = CF._CFCopyServerVersionDictionary()
if dict == nil then
  dict = CF._CFCopySystemVersionDictionary()
end

if dict == nil then
  return 1
end

ffi.gc(dict, CF.CFRelease)

print('ProductName:', dict[CF._kCFSystemVersionProductNameKey])
print('ProductVersion:', dict[CF._kCFSystemVersionProductVersionKey])
print('BuildVersion:', dict[CF._kCFSystemVersionBuildVersionKey])