class ArticlesController < ApplicationController
  def index
    @articles = Article.all
    p @articles.length
      if @articles.length > 0
        render json: {
          articles: @articles
        }
      else
        render json: {
          status: 500,
          errors: ['no articles found']
        }
      end
    end
  def create
    @article = Article.new(user_params)
    if @article.save
      p @article
    else 
      p @article.errors
    end
  end
  def destroy
    Article.where(created_at: 2.days.ago..DateTime.now).delete_all
  end
end
