export interface NewsSources {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
}

export interface NewsArticle {
    source: { id: string; name: string };
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
}

export interface ResponseNews {
    status: string;
    totalResults: number;
    articles: NewsArticle[];
}

export interface ResponseSources {
    status: number;
    sources: NewsSources[];
}
