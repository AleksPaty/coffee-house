import { NewsArticle, NewsSources, ResponseNews } from '../../types/interface';
import News from './news/news';
import Sources from './sources/sources';

export class AppView {
    news: News;
    sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    public drawNews(data: ResponseNews) {
        const values: NewsArticle[] = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    public drawSources(data: { status: number; sources: NewsSources[] }) {
        const values: NewsSources[] = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
