#!/usr/bin/env ruby

require 'mongo'

#####################################
# to find mongo url in use by meteor:
#    meteor mongo -U" 
######################################

mongo_client = Mongo::MongoClient.new('localhost', '3001')

dbnames = mongo_client.database_names
dbinfo  = mongo_client.database_info

puts "databases:"
dbinfo.each_pair do |name,size|
  puts "#{name}: #{size} bytes"
end

meteor   = mongo_client.db("meteor")
messages = meteor.collection("messages")

msg = {
  "createdAt" => Time.new, 
  "text" => "it worked!", 
  "sentFrom" => "a ruby script", 
  "status" => "open",
  "assignedTo" => "nobody"
}

messages.insert(msg);

messages.find().each do |msg|
  puts msg.inspect
  puts
end

