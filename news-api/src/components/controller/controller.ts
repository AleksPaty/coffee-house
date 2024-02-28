import { ResponseNews, ResponseSources } from '../../types/interface';
import AppLoader from './appLoader';
import { CallbackFunc } from './loader';

class AppController extends AppLoader {
    public getSources(callback: NonNullable<CallbackFunc<ResponseSources>>) {
        super.getResp(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    public getNews(e: Event, callback: NonNullable<CallbackFunc<ResponseNews>>) {
        let target = e.target as HTMLElement;
        const newsContainer = e.currentTarget as HTMLElement;

        while (target && target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id');
                if (newsContainer.getAttribute('data-source') !== sourceId && sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp(
                        {
                            endpoint: 'everything',
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            target = target.parentNode as HTMLElement;
        }
    }
}

export default AppController;
