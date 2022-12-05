package beans;
import java.util.LinkedList;
import java.util.List;

public class PointBean {
    private List<Point> points;

    public PointBean() {
        points = new LinkedList<>();
    }

    public List<Point> getPoints() {
        return points;
    }
}