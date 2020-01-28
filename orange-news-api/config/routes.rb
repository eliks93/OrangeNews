Rails.application.routes.draw do
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  get '/logged_in', to: 'sessions#is_logged_in?'
  resources :users, only: [:create, :show]
  get '/articles', to: 'articles#index'
  delete '/articles', to 'articles#destroy'
  post '/articles', to 'articles#create'
  resources :articles
end
