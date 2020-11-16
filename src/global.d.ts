declare namespace shapefile {
  type Result = {
    done: boolean;
    value: JSON;
  };
  type Source = {
    read: () => Promise<Result>;
  };

  var open: (url: string) => Promise<Source>;
}
