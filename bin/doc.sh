#! /bin/bash
function read_dir(){
  for file in `ls $1`       #注意此处这是两个反引号，表示运行系统命令
  do
    if [ -d $1"/"$file ]  #注意此处之间一定要加上空格，否则会报错
    then
      read_dir $1"/"$file
    else
      sed -e 's/.md//g' $1"/"$file > $1"/"$file".zh.md"
      rm $1"/"$file
      cp -f $1"/"$file".zh.md" `echo $1"/"$file".zh.md" | sed 's/.zh.md$/.en.md/'`
    fi
  done
}
#读取第一个参数
read_dir $1
