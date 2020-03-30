#!/bin/bash
#Confirm ImageMagick is installed
if dpkg --get-selections | grep -q "^imagemagick.*install" >/dev/null; then
  printf "Confirmed ImageMagick Package Install \n\n"
else
  printf "Error please install imagemagick first: \n"
  printf "sudo apt-get install imagemagick -y \n"
fi

#Grab the entered file name
orig_photo_name=$1

#Variables:
#Maximum Placeholder Size
max_p_width=1280
max_p_height=720
#Maximum Thumbnail Sizes:
max_t_width=768
max_t_height=432
#Maxiumum 2X Thumb Size:
max_tt_width=1024
max_tt_height=576

#Check if file name exists.
if [ ! -f "$orig_photo_name" ]; then
  printf "File name not found!\n"
  exit 1
else
  printf "Getting info about image...\n"
fi

#Get the New Placehold filename:
p_photo_name="${orig_photo_name%.*}_placehold.jpg"
t_photo_name="${orig_photo_name%.*}_thumb.jpg"
tt_photo_name="${orig_photo_name%.*}_thumb@2x.jpg"

#Print out the size of the photo given
printf "Original Image Size: "
identify -format "%wx%h" "$orig_photo_name"
printf "\n"

#Create a resized placholder image:
printf "\nCreating placholder image...\n"
printf "Resizing to $max_p_width x $max_p_height"
convert "$orig_photo_name" -resize "$max_p_width"x"$max_p_height"\> "$p_photo_name"
printf "\nImage Resized to: "
identify -format "%wx%h" "$p_photo_name"
printf " and saved to: $p_photo_name \n"
printf "\n"

#Create a resized thumbnail image:
printf "\nCreating thumbnail image...\n"
printf "Resizing to $max_t_width x $max_t_height"
convert "$orig_photo_name" -resize "$max_t_width"x"$max_t_height"\> "$t_photo_name"
printf "\nImage Resized to: "
identify -format "%wx%h" "$t_photo_name"
printf " and saved to: $t_photo_name \n"
printf "\n"

#Create a resized 2x thumbnail image:
printf "\nCreating 2x thumbnail image...\n"
printf "Resizing to $max_tt_width x $max_tt_height"
convert "$orig_photo_name" -resize "$max_tt_width"x"$max_tt_height"\> "$tt_photo_name"
printf "\nImage Resized to: "
identify -format "%wx%h" "$tt_photo_name"
printf " and saved to: $tt_photo_name \n"
printf "\n"