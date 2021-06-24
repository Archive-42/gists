public class RepositoryImpl<T, ID extends Serializable>
        extends SimpleJpaRepository<T, ID extends Serializable> {
        
    ProjectionFactory projectionFactory;

    public <P> List<P> findProjected(Specification<?> spec, Sort sort, Class<P> projectionClass) {
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<Tuple> tupleQuery = criteriaBuilder.createTupleQuery();
        Root<?> root = tupleQuery.from(getDomainClass());

        // Gathering selections from the projection class
        // `toExpressionRecursively` would be imported from QueryUtils
        Set<Selection<?>> selections = new HashSet<>();
        List<PropertyDescriptor> inputProperties = projectionFactory.getProjectionInformation(projectionClass).getInputProperties();
        for (PropertyDescriptor propertyDescriptor : inputProperties) {
            String property = propertyDescriptor.getName();
            PropertyPath path = PropertyPath.from(property, getDomainClass());
            selections.add(toExpressionRecursively(root, path).alias(property));
        }

        // Select, restrict and order 
        tupleQuery.multiselect(new ArrayList<>(selections))
                .where(spec.toPredicate((Root) root, tupleQuery, criteriaBuilder))
                .orderBy(QueryUtils.toOrders(sort, root, criteriaBuilder));

        TypedQuery<Tuple> query = entityManager.createQuery(tupleQuery);
        List<Tuple> results = query.getResultList();

        // Create maps for each result tuple
        List<P> projectedResults = new ArrayList<>(results.size());
        for (Tuple tuple : results) {
            Map<String, Object> mappedResult = new HashMap<>(tuple.getElements().size());
            for (TupleElement<?> element : tuple.getElements()) {
                String name = element.getAlias();
                mappedResult.put(name, tuple.get(name));
            }

            projectedResults.add(projectionFactory.createProjection(projectionClass, mappedResult));
        }

        return mappedResults;
    }

}