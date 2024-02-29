import { NewsArticle } from '../../../types/interface';
import './news.css';

type NoEmptyElement = NonNullable<HTMLElement | null>;

class News {
    public draw(data: NewsArticle[]): void {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector<HTMLTemplateElement>('#newsItemTemp');
        if (!(newsItemTemp instanceof HTMLTemplateElement)) return;

        news.forEach((item, idx) => {
            const newsClone = <NoEmptyElement>newsItemTemp.content.cloneNode(true);

            if (idx % 2) newsClone.querySelector('.news__item')?.classList.add('alt');

            (newsClone.querySelector('.news__meta-photo') as HTMLElement).style.backgroundImage = `url(${
                item.urlToImage || 'img/news_placeholder.jpg'
            })`;

            const author = newsClone.querySelector('.news__meta-author');
            const metaDate = newsClone.querySelector('.news__meta-date');
            if (author) {
                author.textContent = item.author || item.source.name;
            }
            if (metaDate) {
                metaDate.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');
            }

            (newsClone.querySelector('.news__description-title') as NoEmptyElement).textContent = item.title;
            (newsClone.querySelector('.news__description-source') as NoEmptyElement).textContent = item.source.name;
            (newsClone.querySelector('.news__description-content') as NoEmptyElement).textContent = item.description;
            (newsClone.querySelector('.news__read-more a') as NoEmptyElement).setAttribute('href', item.url);

            fragment.append(newsClone);
        });

        const newsElem = document.querySelector('.news');
        if (newsElem) {
            newsElem.innerHTML = '';
            newsElem.appendChild(fragment);
        }
    }
}

export default News;
