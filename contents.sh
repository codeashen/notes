LINE_PATTERN="- [title](link)"

# 生成目录
generateContents() {
  path=$1
  # 如果不是一个目录，则返回
  if [ ! -d "$path" ]; then
    return
  fi
  echo "===== [$path] ====="

  # 先清空path下的README.md, 再生成目录
  : >"$path/README.md"
  appendItems "$path"

  # 遍历path下的子目录, 递归生成目录
  for file in "$path"/*; do
    if [ -d "$file" ]; then
      depth=$((depth + 1))
      generateContents "$file"
    fi
  done
  
  depth=$((depth - 1))
}

# 接收一个目录的路径，将该目录下的所有文件和文件夹的名字输出到README.md文件中
appendItems() {
  path=$1
  # 遍历 path 目录下的所有文件和目录，追加到 README.md 文件中
  for file in "$path"/*; do
    title=$(basename "$file")
    # 忽略无关文件
    if [ -f "$file" ] && (
      [ "${title##*.}" != "md" ] ||
        [ "$title" = "README.md" ] ||
        [ "$title" = "_navbar.md" ]
    ); then
      continue
    fi

    link=${title// /%20}
    if [ -d "$file" ]; then
      link="$link/README.md"
    fi
    echo "$title"
    # echo "$LINE_PATTERN" | sed "s/title/$title/g" | sed "s|link|$link|g" >> "$path/README.md"
    echo $(line "$title" "$link") >>"$path/README.md"
  done
}

# 接收一个 title 和 link 参数，返回一个 markdown 格式的行
line() {
  line=$LINE_PATTERN
  line=${line/title/$1}
  line=${line/link/$2}
  echo "$line"
}

# 接收脚本传入的初始路径，默认为 docs/
root=$1
if [ -z "$root" ]; then
  root="docs/"
fi
echo "root path: $root"
generateContents "$root"