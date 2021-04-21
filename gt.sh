SCRIPT_NAME=$0

# 配置git仓库用户信息
gitConfig() {
    # 配置用户名
    echo "--------------------- config user ---------------------"
    echo -n "please enter your user.name: "
    read name
    if  [ ! -n "$name" ] ;then
        name=CodeAshen
    fi
    # 配置邮箱
    echo -n "please enter your user.email: "
    read email
    if  [ ! -n "$email" ] ;then
        email=codeashen@qq.com
    fi
    git config user.name $name
    git config user.email $email
    # 回写结果
    git config user.name
    git config user.email
}

# 配置git远程仓库
gitRemote() {
    echo "-------------------- update remote --------------------"
    echo -n "please enter remote address: "
    read remote_addr
    git remote remove origin > /dev/null 2>&1
    git remote add origin $remote_addr
    git remote -v
}

# 初始化git仓库
gitInit() {
    echo "------------------- init repository -------------------"
    git init
    gitConfig
    gitRemote
}

# 提交并推送
gitCommitAndPush() {
    echo "------------------------ pull -------------------------"
    git pull
    echo "---------------------- add files ----------------------"
    echo ">>> git add ."
    git add .
    echo ">>> git status"
    git status
    echo "----------------------- commit ------------------------"
    echo -n "please enter commit remark: "
    read remark
    echo ">>> git commit -am '$remark'"
    git commit -am "$remark"
    echo "------------------------ push -------------------------"
    echo ">>> git push -u origin master"
    git push -u origin master
}

# 定义命令执行选项
if ! ARGS=$(getopt -o i:c:p:r:h --long init:,config:,push:,remote:,help -n "$0" -- "$@" ); then
    echo "ERROR: please run '$SCRIPT_NAME --help' for help"
    exit 0
fi

# 将规范化后的命令行参数分配至位置参数（$1,$2,...）
# The -- ensures that whatever options passed in as part of the script won't get interpreted as options for set, but as options for the command denoted by the $progname variable.
eval set -- "${ARGS}"

# 接受执行选项;赋值给变量
case "$1" in
    -i|--init)
        cd $2
        gitInit
        shift
        ;;
    -c|--config)
        cd $2
        gitConfig
        ;;
    -p|--push)
        cd $2
        gitCommitAndPush
        shift
        ;;
    -r|--remote)
        cd $2
        gitRemote
        shift
        ;;
    -h|--help)
        echo "Usage: $SCRIPT_NAME [options] [dir]"
        echo "Options:"
        echo "  --init, -i      初始化git仓库"
        echo "  --config, -c    配置仓库信息"
        echo "  --push, -p      提交并推送"
        echo "  --remote, -r    更新远程仓库地址"
        echo "  --help, -h      帮助"
        exit 0
        ;;
    --)
        echo "ERROR: missing options, please check!"
        exit 1
        ;;
esac
