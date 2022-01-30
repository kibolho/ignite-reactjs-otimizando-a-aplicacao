import { memo } from "react";
import { MovieCard } from "./MovieCard";
import { Grid, GridCellRenderer, AutoSizer } from "react-virtualized";
interface ContentProps {
  selectedGenre: {
    id: number;
    name: "action" | "comedy" | "documentary" | "drama" | "horror" | "family";
    title: string;
  };

  movies: Array<{
    imdbID: string;
    Title: string;
    Poster: string;
    Ratings: Array<{
      Source: string;
      Value: string;
    }>;
    Runtime: string;
  }>;
}

function ContentComponent({ selectedGenre, movies }: ContentProps) {
  const cellRenderer: GridCellRenderer = ({
    columnIndex,
    key,
    rowIndex,
    style,
  }) => {
    return (
      <div key={key} style={style}>
        <MovieCard
          key={key}
          title={movies[columnIndex + rowIndex]?.Title}
          poster={movies[columnIndex + rowIndex]?.Poster}
          runtime={movies[columnIndex + rowIndex]?.Runtime}
          rating={movies[columnIndex + rowIndex]?.Ratings[0].Value}
        />
      </div>
    );
  };
  return (
    <div className="container">
      <header>
        <span className="category">
          Categoria:<span> {selectedGenre.title}</span>
        </span>
      </header>

      <main>
        {/* <div className="movies-list"> */}
        {movies ? (
          <AutoSizer>
            {({ height, width }) => {
              console.log({ height, width, length: movies.length });
              return (
                <Grid
                  cellRenderer={cellRenderer}
                  columnCount={3}
                  columnWidth={width/3}
                  height={height}
                  rowCount={Math.ceil(movies.length / 3)}
                  rowHeight={400}
                  width={width}
                />
              );
            }}
          </AutoSizer>
        ) : null}
        {/* </div> */}
      </main>
    </div>
  );
}

export const Content = memo(ContentComponent, (prev, next) => {
  return Object.is(prev.selectedGenre, next.selectedGenre);
});
