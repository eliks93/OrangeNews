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
end
