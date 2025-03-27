import pandas as pd
import plotly.graph_objs as go
import plotly.express as px
import numpy as np
import requests
from bs4 import BeautifulSoup
import random
from datetime import datetime, timedelta

def fetch_tech_company_data():
    """
    Simulate tech company performance data
    """
    tech_companies = [
        'Apple', 'Google', 'Microsoft', 'Amazon', 
        'Facebook', 'Netflix', 'Twitter', 'Intel'
    ]
    
    performance_data = {}
    for company in tech_companies:
        # Simulate performance metrics
        performance_data[company] = {
            'innovation_score': random.uniform(60, 95),
            'market_impact': random.uniform(50, 100),
            'customer_satisfaction': random.uniform(70, 95)
        }
    
    return performance_data

def scrape_tech_news_sentiment():
    """
    Simulate tech news sentiment analysis
    """
    try:
        # Simulated news sources
        news_sources = [
            'TechCrunch', 'Wired', 'The Verge', 
            'Engadget', 'MIT Technology Review'
        ]
        
        sentiments = {}
        for source in news_sources:
            # Simulate sentiment scores
            sentiments[source] = {
                'positive_sentiment': random.uniform(50, 90),
                'negative_sentiment': random.uniform(10, 50)
            }
        
        return sentiments
    except Exception as e:
        print(f"Error in news sentiment analysis: {e}")
        return {}

def generate_marketing_trends():
    """
    Generate comprehensive marketing trends
    """
    trends_data = {
        'Tech Company Performance': fetch_tech_company_data(),
        'News Sentiment': scrape_tech_news_sentiment(),
        'Social Media Engagement': {
            'Twitter': random.uniform(50, 90),
            'LinkedIn': random.uniform(60, 95),
            'Instagram': random.uniform(70, 100),
            'TikTok': random.uniform(40, 85)
        },
        'Timestamp': datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    }
    
    return trends_data

def create_trend_visualizations(trends_data):
    """
    Create interactive visualizations from trend data
    """
    visualizations = {}
    
    # 1. Social Media Engagement Bar Chart
    sm_engagement = trends_data.get('Social Media Engagement', {})
    sm_engagement_df = pd.DataFrame.from_dict(
        sm_engagement, 
        orient='index', 
        columns=['Engagement Score']
    ).reset_index()
    sm_engagement_df.columns = ['Platform', 'Engagement Score']
    
    fig1 = px.bar(
        sm_engagement_df, 
        x='Platform', 
        y='Engagement Score', 
        title=f'Social Media Engagement ({trends_data.get("Timestamp", "Recent")})',
        color='Engagement Score',
        color_continuous_scale='Viridis'
    )
    fig1.update_layout(
        plot_bgcolor='rgba(0,0,0,0)', 
        paper_bgcolor='rgba(0,0,0,0)', 
        font_color='white',
        title_font_color='white'
    )
    
    # 2. Tech Company Performance Radar Chart
    tech_performance = trends_data.get('Tech Company Performance', {})
    radar_categories = ['innovation_score', 'market_impact', 'customer_satisfaction']
    
    radar_data = []
    for company, metrics in tech_performance.items():
        radar_data.append(go.Scatterpolar(
            r=[metrics.get(cat, 0) for cat in radar_categories],
            theta=radar_categories,
            fill='toself',
            name=company
        ))
    
    fig2 = go.Figure(data=radar_data)
    fig2.update_layout(
        polar=dict(radialaxis=dict(visible=True, range=[0, 100])),
        title='Tech Company Performance Metrics',
        plot_bgcolor='rgba(0,0,0,0)', 
        paper_bgcolor='rgba(0,0,0,0)', 
        font_color='white',
        title_font_color='white'
    )
    
    # 3. News Sentiment Stacked Bar Chart
    news_sentiment = trends_data.get('News Sentiment', {})
    sentiment_df = pd.DataFrame.from_dict(news_sentiment, orient='index')
    sentiment_df.reset_index(inplace=True)
    sentiment_df.columns = ['News Source', 'Positive Sentiment', 'Negative Sentiment']
    
    fig3 = go.Figure(data=[
        go.Bar(name='Positive', x=sentiment_df['News Source'], y=sentiment_df['Positive Sentiment'], marker_color='green'),
        go.Bar(name='Negative', x=sentiment_df['News Source'], y=sentiment_df['Negative Sentiment'], marker_color='red')
    ])
    fig3.update_layout(
        barmode='stack',
        title='Tech News Sentiment Analysis',
        plot_bgcolor='rgba(0,0,0,0)', 
        paper_bgcolor='rgba(0,0,0,0)', 
        font_color='white',
        title_font_color='white'
    )
    
    return {
        'social_media_engagement': fig1.to_html(full_html=False),
        'tech_company_performance': fig2.to_html(full_html=False),
        'news_sentiment': fig3.to_html(full_html=False),
        'timestamp': trends_data.get('Timestamp', 'Unknown')
    }