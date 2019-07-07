class UsersController < ApplicationController

  #インクリメンタルサーチの設定
    def index
    end
  
  #もしcurrent_userがアップデートしたら、rootにpath。
    def update
      if current_user.update(user_params)
        redirect_to root_path
      else
  #アップデートできなかったら、テキスト内容そのまま残して編集。
        render :edit
      end
    end

    private
  
  #userはname, :emailで認証されている。
    def user_params
     params.require(:user).permit(:name, :email)
    end
  
  end