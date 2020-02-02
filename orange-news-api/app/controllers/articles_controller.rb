class ArticlesController < ApplicationController
  def index
    @articles = Article.all
    p @articles
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
    @article = Article.new(article_params)
    if @article.save
      render json: {
        status: 200
      }
    else 
      render json: {
        errors: @article.errors,
        status: 500
    }
    end
  end
  def destroy
    p Article.select(:created_at, :id)
    before = Article.count
    Article.where('created_at > ?', 24.hours.ago).delete_all
    after = Article.count
    render json: {
      before: before,
      after: after
    }
  end
  def article_params
    params.permit(:headline, :link, :image, :snippet, :publisher)
  end
end
